import React, {Component} from 'react';
import {List, ListItem} from 'react-native-elements';
import NavigationBar from 'react-native-navbar';
import ModalDropdown from 'react-native-modal-dropdown';
import {getGameSpec} from '../../backend/games/game_specs';
import {
    Text,
    View,
    TextInput,
    ScrollView,
    AsyncStorage
} from 'react-native';

import * as firebase from 'firebase';

import styles from '../styles/common_style'

export default class GameSpecComponent extends Component {

    constructor(props) {
        super(props);
    }

    _loadGameSpecs(gameSpecs) {

        const {addGameSpec, resetGameSpecs, setLoading} = this.props;

        resetGameSpecs();

        let duplicateMap = {};

        for (let specId in gameSpecs) {

            if (gameSpecs.hasOwnProperty(specId)) {
                getGameSpec(specId).then(response => {
                    let gameSpec = {};

                    gameSpec.specId = specId;

                    duplicateMap[gameSpec.specId] = 0;

                    gameSpec.specName = response.gameName;
                    gameSpec.iconSmall = response.gameIcon50x50;
                    gameSpec.iconLarge = response.gameIcon512x512;
                    gameSpec.wikiURL = response.wikipediaUrl;
                    gameSpec.tutorial = response.tutorialYoutubeVideo;

                    gameSpec.boardBackGroundColor = response.board.backgroundColor;
                    gameSpec.boardImageId = response.board.imageId;
                    gameSpec.boardMaxscale = response.board.maxscale;

                    addGameSpec(gameSpec);

                }).catch(error => console.log(error));
            }
        }
    }

    componentWillMount() {

        const { addGameSpecs } = this.props;

        firebase.database().ref('gameBuilder/gameSpecs/').once('value').then(response => {

            let parsedGameSpecs = [];
            response.forEach(gameSpecRAW => {

                let gameSpec = gameSpecRAW.val();
                let parsedGameSpec = {};

                parsedGameSpec.specId = gameSpecRAW.key;
                console.log(parsedGameSpec.specId);
                parsedGameSpec.specName = gameSpec.gameName;
                parsedGameSpec.iconSmall = gameSpec.gameIcon50x50;
                parsedGameSpec.iconLarge = gameSpec.gameIcon512x512;
                parsedGameSpec.wikiURL = gameSpec.wikipediaUrl;
                parsedGameSpec.tutorial = gameSpec.tutorialYoutubeVideo;
                parsedGameSpec.boardBackGroundColor = gameSpec.board.backgroundColor;
                parsedGameSpec.boardImageId = gameSpec.board.imageId;
                parsedGameSpec.boardMaxscale = gameSpec.board.maxscale;

                parsedGameSpecs.push(parsedGameSpec);

            });

            addGameSpecs(parsedGameSpecs)
        });
    }


    _chooseGame(gameSpec) {
        const {switchGame, switchScreen, groupId, resetPieces, resetElements, resetPieceStates} = this.props;
        // Update current game and add a new match

        let specId = gameSpec.specId;
        let currentPieces = {};
        let matchId;

        getGameSpec(specId).then(response => {

            console.log(response);

            let pieces = response.pieces;
            let indexList = Object.keys(pieces);

            for (let index in pieces) {
                let pieceFromFirebase = pieces[index];
                currentPieces[index] = {
                    currentState: pieceFromFirebase.initialState
                };
            }

            let match = {
                gameSpecId: gameSpec.specId,
                createdOn: firebase.database.ServerValue.TIMESTAMP,
                lastUpdatedOn: firebase.database.ServerValue.TIMESTAMP,
            };

            matchId = firebase.database().ref('gamePortal/groups/' + groupId + '/matches/').push(match).key;

            for (let i = 0; i < indexList.length; i++) {
                firebase.database()
                    .ref('gamePortal/groups/' + groupId + '/matches/' + matchId + '/pieces/')
                    .child(i.toString())
                    .set(currentPieces[i])
                    .catch(error => console.log(error));
            }

            gameSpec.matchId = matchId;


            resetPieces();
            resetElements();
            resetPieceStates();
            switchGame(gameSpec);

        });

    }

    render() {
        const {gameSpecs, loading, switchScreen} = this.props;

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
                        title={{title: 'Select a game'}}
                        rightButton={{
                            title: 'Back',
                            handler: () => switchScreen('Chat')
                        }}
                    />
                </View>
                {/* <View style={styles.selectGame}>
                    <ModalDropdown
                        style={styles.gameSpecsDropDown}
                        options={['option 1', 'option 2']}

                    >
                    </ModalDropdown>
                </View> */}
                <ScrollView
                    ref={ref => this.scrollView = ref}
                    styles={styles.selectGame}
                    onContentSizeChange={(contentWidth, contentHeight) => {
                        this.scrollView.scrollToEnd({animated: true});
                    }}
                >
                    <List style={styles.gameSpecs}>
                        {
                            gameSpecs.map((spec, index) => (

                                <ListItem
                                    key={index}
                                    title={spec.specName}
                                    onPress={() => this._chooseGame(spec)}
                                    hideChevron={true}
                                />
                            ))
                        }
                    </List>
                </ScrollView>
            </View>
        );
    }
}