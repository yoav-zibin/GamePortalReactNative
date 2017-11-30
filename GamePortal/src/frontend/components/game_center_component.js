import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';
import NavigationBar from 'react-native-navbar';
import { getGameSpec } from '../../backend/games/game_specs';
import { 
    Text, 
    View, 
    Image,
    TextInput, 
    ScrollView, 
    AsyncStorage 
} from 'react-native';

import * as firebase from 'firebase';

import styles from '../styles/common_style'

export default class gameCenterComponent extends Component {

    constructor(props) {
        super(props);
    }

    _loadPiecesState(piecesState) {
        const { addPiece } = this.props;
        for (let index in piecesState) {
            let piece = piecesState[index];
            let pieceDisplay = {
                elementId: piece.pieceElementId,
                currentState: piece.initialState
            };
            addPiece(pieceDisplay);
        }
    }

    _loadPieceInfo(pieceImageInfo, pieceImageId, pieceIndex) {
        const { addPieceInfo } = this.props;
        let pieceInfo = {
            imageInfo: pieceImageInfo,
            imageId: pieceImageId,
            index: pieceIndex
        }
        addPieceInfo(pieceInfo);
    }

    componentWillMount() {
        const { groupId, matchId, currentGameId, boardImageId, setBoardImageURL } = this.props;

        firebase.database().ref('gameBuilder/images/' + boardImageId).once('value').then(image => {
            let jsonString = JSON.stringify(image);
            let imageParsed = JSON.parse(jsonString);
            setBoardImageURL(imageParsed.downloadURL);
        }).catch(error => alert(error));

        firebase.database()
        .ref('gameBuilder/gameSpecs/' + currentGameId + '/pieces/')
        .once('value')
        .then(value => {
            let jsonString = JSON.stringify(value);
            let parsed = JSON.parse(jsonString);
            this._loadPiecesState(parsed);
        });
        
        getGameSpec(currentGameId).then(response => {

            let piecesFromBuilder = response.pieces;

            for (let index in piecesFromBuilder) {
                let pieceFromBuilder = piecesFromBuilder[index];
                let elementId = pieceFromBuilder.pieceElementId;

                let pieceImageId;
                let pieceImageInfo

                firebase.database().ref('gameBuilder/elements/' + elementId + '/images/').once('value').then(value => {
                    let jsonString = JSON.stringify(value);
                    let parsed = JSON.parse(jsonString);
                    pieceImageId = parsed[0].imageId;

                    firebase.database().ref('gameBuilder/images/' + pieceImageId).once('value').then(value => {
                        let jsonString = JSON.stringify(value);
                        pieceImageInfo = JSON.parse(jsonString);
                        this._loadPieceInfo(pieceImageInfo, pieceImageId, index);
                    });

                });
            }
        });
    }

    render() {
        const { currentGameName, boardImage, loading, switchScreen, pieces, piecesInfo } = this.props;

        if (loading) {
            return (
                <View style={styles.container}>
                    <Text style={styles.header}>
                        Loading game spec information
                    </Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <NavigationBar
                        rightButton={{
                            title: 'Back',
                            handler: () => switchScreen('Home')
                        }}
                    />
                </View>
                <Image
                    style={{width: 300, height: 300}}
                    source={{uri: boardImage.url}}
                />
            </View>
        );
    }
}