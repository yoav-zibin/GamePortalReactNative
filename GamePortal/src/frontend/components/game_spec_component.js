import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';
import NavigationBar from 'react-native-navbar';
import { getGameSpec } from '../../backend/games/game_specs';
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
        
        const { addGameSpec } = this.props;
        let keys = Object.keys(gameSpecs);

        for (let i = 0; i < 10; i++) {
            specId = keys[i];

            if (gameSpecs.hasOwnProperty(specId)) {
                getGameSpec(specId).then(response => {
                    let gameSpec = {};

                    gameSpec.specId = specId;
                    gameSpec.specName = response.gameName;
                    gameSpec.icon = response.gameIcon50x50;
                    gameSpec.wiki = response.wikipediaUrl;
                    gameSpec.tutorial = response.tutorialYoutubeVideo;
                    gameSpec.board = response.board;
                    gameSpec.pieces = response.pieces;

                    addGameSpec(gameSpec);
                }).catch(error => console.log(error));
            }
        }
    }

    componentWillMount() {

        AsyncStorage.getItem('userData').then(udJSON => {
            let userData = JSON.parse(udJSON);

            firebase.database().ref('gameBuilder/gameSpecs/').once('value', gameSpecs => {
                let jsonString = JSON.stringify(gameSpecs);
                let specsParsed = JSON.parse(jsonString);

                this._loadGameSpecs(specsParsed);
            });
        });
    }

    
    _chooseGame(gameSpec) {
        const { switchGame, switchScreen } = this.props;
        // Update current game
        switchGame(gameSpec);
        switchScreen('CurrentGame');
    }

    render() {
        const {gameSpecs, loading} = this.props;
        console.log('Game Specs: ', gameSpecs);

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
                    />
                </View>
                <ScrollView
                    ref={ref => this.scrollView = ref}
                    styles={styles.selectGame}
                    onContentSizeChange={(contentWidth, contentHeight)=>{
                    this.scrollView.scrollToEnd({animated: true});}}
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