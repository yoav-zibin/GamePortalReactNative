import React, {Component} from 'react';
import NavigationBar from 'react-native-navbar';
import {
    View,
    Image,
    Dimensions,
    Button,
} from 'react-native';

import * as firebase from 'firebase';
import styles from "../../resources/styles/common_style";
import Text from "react-native-elements/src/text/Text";

export default class GameRendererComponent extends Component {

    componentWillMount() {
        const {setLoading} = this.props;

        setLoading(true);
        this.loadMatch();
        setLoading(false);
    }

    render() {
        const { loading } = this.props;

        if (loading) {
            return GameRendererComponent.loadingScreen();
        } else {
            return this.renderer();
        }
    }

    static loadingScreen() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    Please Wait
                </Text>
            </View>
        );
    }

    renderer() {
        const {
            boardImage, switchScreen, elements, pieces, pieceStates, setPieceLocation, setSelectedPiece,
            selectedPieceIndex, gameSpecs, gameSpecId, user, groups, groupId
        } = this.props;

        let renderedPieces = [];

        let gameSpec = gameSpecs[gameSpecId];
        let gameName = gameSpec['gameName'];

        let screenWidth = Dimensions.get('window').width;
        let screenHeight = Dimensions.get('window').height;
        let scale = screenWidth / boardImage.width;

        let group = undefined;

        groups.forEach(g => {
           if (g.groupId === groupId) {
               group = g;
           }
        });

        for (let pieceIndex in pieces) {
            if (pieces.hasOwnProperty(pieceIndex)) {
                let piece = pieces[pieceIndex];
                let pieceState = pieceStates[pieceIndex];
                let element = elements[piece.pieceElementId];

                if (pieceState === undefined || element === undefined) { //not yet fully loaded element
                    continue;
                }

                let imageURL = undefined;

                if (element.elementKind !== 'card') {
                    imageURL = element.images[pieceState.currentImageIndex];
                } else {
                    let participantIndex = group.participants[user.firebaseUserId]['participantIndex'];

                    console.log(piece.pieceElementId);
                    console.log(participantIndex);
                    console.log(pieceState);
                    if (pieceState.cardVisibility && pieceState.cardVisibility[participantIndex]) {
                        imageURL = element.images[0];
                    } else {
                        imageURL = element.images[1];
                    }
                }


                let width = element.width * scale;
                let height = element.height * scale;
                let xPos = (pieceState.x / 100) * (boardImage.width * scale);
                let yPos = (pieceState.y / 100) * (boardImage.height * scale);
                let zDepth = pieceState.zDepth;

                let borderColor = "transparent";
                let borderWidth = 0;

                if (pieceIndex === selectedPieceIndex) {
                    if (element.isDraggable) {
                        borderColor = "green";
                        borderWidth = 2;
                    } else {
                        borderColor = "red";
                        borderWidth = 2;
                    }
                }

                renderedPieces.push((
                    <View
                        key={Number.parseInt(pieceIndex)}
                        style={{
                            position: 'absolute',
                            width: width,
                            height: height,
                            left: xPos,
                            top: yPos,
                            zIndex: zDepth,
                            borderColor: borderColor,
                            borderWidth: borderWidth
                        }}
                        onStartShouldSetResponder={() => true}
                        onMoveShouldSetResponder={() => true}
                        onResponderGrant={() => {
                            setSelectedPiece(pieceIndex);
                        }}
                        onResponderMove={event => {
                            let element = elements[piece.pieceElementId];

                            if (element.isDraggable) {
                                let fingerX = event.nativeEvent.pageX - event.nativeEvent.locationX;
                                let fingerY = event.nativeEvent.pageY - event.nativeEvent.locationY;
                                let percentX = (fingerX / (boardImage.width * scale)) * 100;
                                let percentY = ((fingerY - (screenHeight * 0.1)) / (boardImage.height * scale)) * 100;
                                setPieceLocation(pieceIndex, percentX, percentY, false);
                            }
                        }}
                        onResponderRelease={event => {

                            if (element.isDraggable) {
                                let fingerX = event.nativeEvent.pageX - event.nativeEvent.locationX;
                                let fingerY = event.nativeEvent.pageY - event.nativeEvent.locationY;
                                let percentX = (fingerX / (boardImage.width * scale)) * 100;
                                let percentY = ((fingerY - (screenHeight * 0.1)) / (boardImage.height * scale)) * 100;
                                setPieceLocation(pieceIndex, percentX, percentY, false);
                                this.saveState(pieceIndex);
                            }
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
                        title={{title: gameName}}
                        rightButton={{
                            title: 'Back',
                            handler: () => switchScreen('GameCenter')
                        }}
                    />
                </View>
                <View style={styles.gameContainer}>
                    <Image
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            zIndex: 0,
                            width: boardImage.width * scale,
                            height: boardImage.height * scale
                        }}
                        source={{uri: boardImage.url}}
                    />

                    {renderedPieces}
                    {this.maybeRenderToolbar()}
                </View>
            </View>
        );
    }

    maybeRenderToolbar() {
        const {selectedPieceIndex, pieces, pieceStates, elements,
            setSelectedPiece, togglePiece, rollDicePiece, user, groups, groupId} = this.props;

        if (selectedPieceIndex === -1) {
            return undefined
        }

        let piece = pieces[selectedPieceIndex];
        let pieceState = pieceStates[selectedPieceIndex];
        let element = elements[piece.pieceElementId];

        let top = "0%";

        if (pieceState.y < 50) {
            top = "80%"
        }

        let closeToolbarButton = (
            <Button
                onPress={() => setSelectedPiece(-1)}
                title="X"
            />
        );

        let toggleButton = undefined;
        let rollDiceButton = undefined;
        let showMeCardButton = undefined;
        let showAllCardButton = undefined;
        let hideCardButton = undefined;

        if (element.elementKind === 'toggable') {
            toggleButton = (
                <Button
                    onPress={() => {
                        togglePiece(selectedPieceIndex, Object.keys(element.images).length);
                        this.saveState(selectedPieceIndex);
                    }}
                    title="Toggle"
                />
            );
        }

        if (element.elementKind === 'dice') {
            rollDiceButton = (
                <Button
                    onPress={() => {
                        rollDicePiece(selectedPieceIndex, Object.keys(element.images).length);
                        this.saveState(selectedPieceIndex)
                    }}
                    title="Roll"
                />
            );
        }

        if (element.elementKind === 'card') {
            showMeCardButton = (
                <Button
                    onPress={() => {
                        this.setCardVisibility(selectedPieceIndex, "ME");
                        this.saveState(selectedPieceIndex);
                    }}
                    title="Me"
                />
            );

            showAllCardButton = (
                <Button
                    onPress={() => {
                        this.setCardVisibility(selectedPieceIndex, "ALL");
                        this.saveState(selectedPieceIndex)
                    }}
                    title="All"
                />
            );

            hideCardButton = (
                <Button
                    onPress={() => {
                        this.setCardVisibility(selectedPieceIndex, "NONE");
                        this.saveState(selectedPieceIndex);
                    }}
                    title="Hide"
                />
            );
        }

        return (
            <View
                style={[styles.pieceToolbar, {
                    top: top
                }]}
            >
                {toggleButton}
                {closeToolbarButton}
                {rollDiceButton}
                {showMeCardButton}
                {showAllCardButton}
                {hideCardButton}
            </View>
        );
    }

    setCardVisibility(pieceIndex, visibleTo) {
        const { setPieceVisibility, groups, groupId, user } = this.props;

        let group = undefined;

        groups.forEach(g => {
            if (g.groupId === groupId) {
                group = g;
            }
        });


        let pieceVisibility = {};

        switch (visibleTo) {
            case 'ME': {
                let participantIndex = group.participants[user.firebaseUserId]['participantIndex'];
                pieceVisibility[participantIndex] = true;
                break;
            }
            case 'ALL': {

                for (let participantId in group.participants) {
                    if (group.participants.hasOwnProperty(participantId)) {
                        let participantIndex = group.participants[participantId]['participantIndex'];
                        pieceVisibility[participantIndex] = true;
                    }
                }
            }
        }

        setPieceVisibility(pieceIndex, pieceVisibility);
    }

    loadMatch() {
        const {reset, gameSpecs, matches, gameSpecId, matchId} = this.props;

        reset();

        let gameSpec = gameSpecs[gameSpecId];
        let match = matches[matchId];

        this.loadBackgroundImage(gameSpec);
        this.loadElements(gameSpec);
        this.loadState(match);
        this.startLiveSync(match);
    }

    loadBackgroundImage(gameSpec) {

        const {setBoardImage} = this.props;

        let boardImageId = gameSpec['board']['imageId'];

        firebase.database().ref('gameBuilder/images/' + boardImageId).once('value').then(image => {
            let imageParsed = image.val();
            setBoardImage(imageParsed.downloadURL, imageParsed.height, imageParsed.width);
        }).catch(error => console.log(error));
    }

    loadElements(gameSpec) {

        const {addPiece, addElement, addImageToElement} = this.props;

        let pieces = gameSpec.pieces;

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
                            rotatableDegrees: element.rotatableDegrees,
                            elementKind: element.elementKind
                        };


                        addElement(elementId, elementObject);

                        let images = element.images;

                        for (let imageIndex in images) {
                            if (images.hasOwnProperty(imageIndex)) {
                                let image = images[imageIndex];

                                firebase.database().ref('gameBuilder/images/' + image['imageId']).once('value')
                                    .then(response => {
                                        let imageParsed = response.val();
                                        addImageToElement(elementId, imageIndex, imageParsed.downloadURL)
                                    })
                                    .catch(error => console.log(error));
                            }
                        }
                    })
                    .catch(error => console.log(error));
            }
        }
    }

    loadState(match) {
        const {setPieceState} = this.props;

        let pieces = match.pieces;

        for (let pieceIndex in pieces) {
            if (pieces.hasOwnProperty(pieceIndex)) {
                let piece = pieces[pieceIndex];
                let pieceState = piece.currentState;
                pieceState['isSelected'] = false;
                setPieceState(pieceIndex, pieceState);
            }
        }

    }

    startLiveSync() {
        const { groupId, matchId, setPieceState } = this.props;

        firebase.database().ref('gamePortal/groups/' + groupId + "/matches/" + matchId + "/pieces/").
        on('value', pieces => {
            pieces.forEach(pieceRAW => {
                let pieceKey = pieceRAW.key;
                let piece = pieceRAW.val();

                setPieceState(pieceKey, piece.currentState);
            })
        });
    }

    saveState(changedPieceIndex) {
        const {groupId, matchId, pieceStates} = this.props;

        let changedPiece = pieceStates[changedPieceIndex];
        let newX = changedPiece.x;
        let newY = changedPiece.y;
        let newZ = changedPiece.zDepth;
        let currentImageIndex = changedPiece.currentImageIndex;

        firebase.database()
            .ref('gamePortal/groups/' + groupId + "/matches/" + matchId + "/pieces/" + changedPieceIndex + "/currentState")
            .set(
                {
                    x: newX,
                    y: newY,
                    zDepth: newZ,
                    currentImageIndex: currentImageIndex
                }
            ).then(() => {
                firebase.database().ref('gamePortal/groups/' + groupId + "/matches/" + matchId + "/lastUpdatedOn")
                    .set(firebase.database.ServerValue.TIMESTAMP).catch(error => console.log(error))
            }
        );
    }
}