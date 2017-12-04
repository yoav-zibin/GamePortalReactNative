import React, {Component} from 'react';
import NavigationBar from 'react-native-navbar';
import {
    View,
    Image,
    Dimensions
} from 'react-native';

import * as firebase from 'firebase';

import styles from '../styles/common_style'

export default class gameCenterComponent extends Component {

    constructor() {
        super();

    }

    componentWillMount() {
        this.loadBackgroundImage();
        this.loadElements();
        this.loadState();
    }

    render() {
        const {
            currentGameName, boardImage, switchScreen, setScale, setBoardDimensions,
            scale, elements, pieces, pieceStates, setPieceLocation
        } = this.props;

        let renderedPieces = [];

        for (let pieceIndex in pieces) {
            if (pieces.hasOwnProperty(pieceIndex)) {
                let piece = pieces[pieceIndex];
                let pieceState = pieceStates[pieceIndex];
                let element = elements[piece.pieceElementId];

                if (pieceState === undefined || element === undefined) { //not yet fully loaded element
                    continue;
                }

                let imageURL = element.images[pieceState.currentImageIndex];
                let width = element.width * scale.width;
                let height = element.height * scale.height;
                let xPos = pieceState.x + "%";
                let yPos = pieceState.y + "%";
                let zDepth = pieceState.zDepth;

                renderedPieces.push((
                    <View
                        key={Number.parseInt(pieceIndex)}
                        style={{
                            position: 'absolute',
                            width: width,
                            height: height,
                            left: xPos,
                            top: yPos,
                            zIndex: zDepth
                        }}
                        onStartShouldSetResponder={() => true}
                        onMoveShouldSetResponder={() => true}
                        onResponderGrant={event => {
                            console.log(piece.pieceElementId + " touch granted")
                        }}
                        onResponderMove={event => {
                            let pageWidth = Dimensions.get('window').width;
                            let pageHeight = Dimensions.get('window').height;

                            let fingerX = event.nativeEvent.pageX;
                            let fingerY = event.nativeEvent.pageY;

                            let percentX = (fingerX / pageWidth) * 100;
                            let percentY = ((fingerY / pageHeight) * 100) - 5;

                            setPieceLocation(pieceIndex, percentX, percentY);
                        }}
                        onResponderRelease={event => {
                            let pageWidth = Dimensions.get('window').width;
                            let pageHeight = Dimensions.get('window').height;

                            let fingerX = event.nativeEvent.pageX;
                            let fingerY = event.nativeEvent.pageY;

                            let percentX = (fingerX / pageWidth) * 100;
                            let percentY = ((fingerY / pageHeight) * 100) - 5;

                            this.saveState(pieceIndex, percentX, percentY, zDepth, pieceState.currentImageIndex);
                        }}
                    >
                        <Image

                            source={{uri: imageURL}}
                            resizeMode="contain"
                            style={{
                                width: width,
                                height: height,
                            }}
                        />
                    </View>
                ));
            }
        }

        return (
            <View>
                <View style={styles.headerContainer}>
                    <NavigationBar
                        title={{title: currentGameName}}
                        rightButton={{
                            title: 'Back',
                            handler: () => switchScreen('Home')
                        }}
                    />
                </View>
                <View style={styles.gameContainer}>
                    <Image
                        style={styles.canvas}
                        source={{uri: boardImage.url}}
                        resizeMode="stretch"
                        onLayout={event => {
                            let height = event.nativeEvent.layout.height;
                            let width = event.nativeEvent.layout.width;

                            setBoardDimensions(height, width);

                            let scaleHeight = height / boardImage.imageHeight;
                            let scaleWidth = width / boardImage.imageWidth;
                            setScale(scaleHeight, scaleWidth);
                        }}
                    />

                    {renderedPieces}
                </View>
            </View>
        );
    }

    loadBackgroundImage() {
        const {boardImageId, setBoardImage} = this.props;

        firebase.database().ref('gameBuilder/images/' + boardImageId).once('value').then(image => {
            let imageParsed = image.val();
            setBoardImage(imageParsed.downloadURL, imageParsed.height, imageParsed.width);
        }).catch(error => alert(error));
    }

    loadElements() {
        const {currentGameId, addPiece, addElement, addImageToElement} = this.props;

        firebase.database().ref('gameBuilder/gameSpecs/' + currentGameId + "/pieces").once('value')
            .then(response => {
                let pieces = response.val();

                for (let pieceIndex in pieces) {
                    if (pieces.hasOwnProperty(pieceIndex)) {
                        let piece = pieces[pieceIndex];

                        let elementId = piece.pieceElementId;

                        let pieceObject = {
                            deckPieceIndex: piece.deckPieceIndex,
                            pieceElementId: elementId
                        };

                        addPiece(pieceIndex, pieceObject);

                        firebase.database().ref('gameBuilder/elements/' + elementId).once('value')
                            .then(response => {

                                let element = response.val();

                                let elementObject = {
                                    width: element.width,
                                    height: element.height,
                                    images: {},
                                    isDraggable: element.isDraggable,
                                    isDrawable: element.isDrawable,
                                    rotatableDegrees: element.rotatableDegrees
                                };


                                addElement(elementId, elementObject);

                                let images = element.images;

                                for (let imageIndex in images) {
                                    if (images.hasOwnProperty(imageIndex)) {
                                        let image = images[imageIndex];

                                        firebase.database().ref('gameBuilder/images/' + image.imageId).once('value')
                                            .then(response => {
                                                let imageParsed = response.val();
                                                addImageToElement(elementId, imageIndex, imageParsed.downloadURL)
                                            })
                                            .catch(error => alert(error));
                                    }
                                }
                            })
                            .catch(error => alert(error));
                    }
                }
            })
            .catch(error => alert(error));
    }

    loadState() {
        const {groupId, matchId, setPieceState} = this.props;

        firebase.database().ref('gamePortal/groups/' + groupId + "/matches/" + matchId).on('value', snapshot => {

            let match = snapshot.val();

            let lastUpdatedOn = match.lastUpdatedOn;
            let pieces = match.pieces;

            for (let pieceIndex in pieces) {
                if (pieces.hasOwnProperty(pieceIndex)) {
                    let piece = pieces[pieceIndex];
                    setPieceState(pieceIndex, lastUpdatedOn, piece.currentState);
                }
            }
        });
    }

    saveState(changedPieceIndex, newX, newY, zDepth, currentImageIndex) {
        const {groupId, matchId} = this.props;

        firebase.database()
            .ref('gamePortal/groups/' + groupId + "/matches/" + matchId + "/pieces/" + changedPieceIndex + "/currentState")
            .set(
                {
                    x: newX,
                    y: newY,
                    zDepth: zDepth,
                    currentImageIndex: currentImageIndex
                }
            ).then(() => {
                firebase.database().ref('gamePortal/groups/' + groupId + "/matches/" + matchId + "/lastUpdatedOn")
                    .set(firebase.database.ServerValue.TIMESTAMP)
            }
        );
    }
}