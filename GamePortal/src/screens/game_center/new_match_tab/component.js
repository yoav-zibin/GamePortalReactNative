import React, {Component} from "react";
import styles from "../../../resources/styles/common_style";
import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import * as firebase from "firebase";

export default class NewMatchTabComponent extends Component {

    constructor() {
        super();

        this.searchIndex = {};
    }

    componentWillMount() {
        this.loadRecentlyAdded();
        this.loadPreviouslyPlayed();
        this.buildSearchIndex();
    }

    render() {
        const {loading} = this.props;

        if (loading) {
            return NewMatchTabComponent.renderLoading();
        }

        return this.renderGameChoice();
    }

    static renderLoading() {
        return (
            <View style={styles.container}>
                <Text>
                    New Match Tab
                </Text>
            </View>
        );
    }

    renderGameChoice() {
        let search = this.renderSearch();
        let previouslyPlayed = this.renderPreviouslyPlayed();
        let recentlyAdded = this.renderRecentlyAdded();

        return (
            <View style={styles.newMatchContainer}>
                <Text>Search</Text>
                <TextInput style={styles.textInput}
                           onChangeText = { text => this.updateSearchResults(text)} />
                {search}
                <Text>Previously Played</Text>
                {previouslyPlayed}
                <Text>Recently Added</Text>
                {recentlyAdded}
            </View>
        );
    }

    renderSearch() {

        const { searchResults } = this.props;

        let rendered = [];

        for (let i = 0; i < 2 && i < searchResults.length; i++) {
            let result = searchResults[i];

            rendered.push((
                <TouchableOpacity
                    onPress={() => this.createMatch(result.gameSpecId)}
                    key={result.gameSpecId}
                >
                    <View style={styles.newMatchIcon}>
                        <Image
                            source={{uri: result.gameIcon}}
                            style={{
                                width: 50,
                                height: 50
                            }}
                        />
                        <Text>{result.gameName}</Text>
                    </View>
                </TouchableOpacity>
            ));
        }


        return (
            <View style={styles.newMatchSection}>
                {rendered}
            </View>
        );
    }

    renderPreviouslyPlayed() {
        const { previouslyPlayedGames } = this.props;

        let rendered = [];

        previouslyPlayedGames.forEach(previouslyPlayedGame => {
            rendered.push((
                <TouchableOpacity
                    onPress={() => this.createMatch(previouslyPlayedGame.gameSpecId)}
                    key={previouslyPlayedGame.gameSpecId}
                >
                    <View style={styles.newMatchIcon}>
                        <Image
                            source={{uri: previouslyPlayedGame.gameIcon}}
                            style={{
                                width: 50,
                                height: 50
                            }}
                        />
                        <Text>{previouslyPlayedGame.gameName}</Text>
                    </View>
                </TouchableOpacity>
            ));
        });



        return (
            <View style={styles.newMatchSection}>
                {rendered}
            </View>
        );
    }

    renderRecentlyAdded() {
        const {recentlyAddedGames} = this.props;

        let rendered = [];

        recentlyAddedGames.forEach(recentlyAddedGame => {
            rendered.push((
                <TouchableOpacity
                    onPress={() => this.createMatch(recentlyAddedGame.gameSpecId)}
                    key={recentlyAddedGame.gameSpecId}
                >
                    <View style={styles.newMatchIcon}>
                        <Image
                            source={{uri: recentlyAddedGame.gameIcon}}
                            style={{
                                width: 50,
                                height: 50
                            }}
                        />
                        <Text>{recentlyAddedGame.gameName}</Text>
                    </View>
                </TouchableOpacity>
            ));
        });

        return (
            <View style={styles.newMatchSection}>
                {rendered}
            </View>
        );


    }

    updateSearchResults(searchString) {
        const { setSearchResults } = this.props;

        searchString = searchString.toLowerCase().replace(" ", "");

        let searchResults = [];

        for (let entry in this.searchIndex) {
            if (this.searchIndex.hasOwnProperty(entry)) {
                let entryParsed = entry.toLowerCase().replace(" ", "");

                if (entryParsed.contains(searchString)) {
                    searchResults.push({
                        'gameSpecId': this.searchIndex[entry].gameSpecId,
                        'gameName': entry,
                        'gameIcon': this.searchIndex[entry].gameIcon
                    });
                }
            }
        }

        setSearchResults(searchResults);
    }

    getGameIcon(gameSpec) {
        return new Promise((resolve, reject) => {
            firebase.database().ref('gameBuilder/images/' + gameSpec['gameIcon50x50']).once('value')
                .then(response => {
                    resolve(response.val().downloadURL);
                })
                .catch(error => reject(error));
        });
    }

    createMatch(gameSpecId) {
        const { groupId, gameSpecs, setGameSpecId, setMatchId, switchScreen } = this.props;

        let gameSpec = gameSpecs[gameSpecId];
        let pieces = gameSpec.pieces;
        let currentPieces = {};

        for (let index in pieces) {
            if (pieces.hasOwnProperty(index)) {
                currentPieces[index] = {
                    currentState: pieces[index]['initialState']
                }
            }
        }

        let match = {
            gameSpecId: gameSpecId,
            createdOn: firebase.database.ServerValue.TIMESTAMP,
            lastUpdatedOn: firebase.database.ServerValue.TIMESTAMP,
            pieces: currentPieces
        };

        let matchId = firebase.database().ref('gamePortal/groups/' + groupId + '/matches/').push(match).key;

        setGameSpecId(gameSpecId);
        setMatchId(matchId);
        switchScreen('GameRenderer')
    }


    buildSearchIndex() {
        const { gameSpecs, resetSearchResults } = this.props;

        resetSearchResults();

        for (let gameSpecId in gameSpecs) {
            if (gameSpecs.hasOwnProperty(gameSpecId)) {
                let gameSpec = gameSpecs[gameSpecId];

                this.getGameIcon(gameSpec).then(gameIcon => {
                    this.searchIndex[gameSpec.gameName] = {
                        "gameSpecId": gameSpecId,
                        "gameIcon": gameIcon
                    }
                });
            }
        }
    }

    loadRecentlyAdded() {

        const {gameSpecs, addRecentlyAddedGame, resetRecentlyAddedGames} = this.props;

        resetRecentlyAddedGames();

        let newest = undefined;
        let secondNewest = undefined;
        let thirdNewest = undefined;

        for (let gameSpecId in gameSpecs) {

            if (gameSpecs.hasOwnProperty(gameSpecId)) {
                let gameSpec = gameSpecs[gameSpecId];

                gameSpec.gameSpecId = gameSpecId;

                if (newest === undefined) {
                    newest = gameSpec;
                } else if (secondNewest === undefined) {
                    if (gameSpec.createdOn > newest.createdOn) {
                        secondNewest = newest;
                        newest = gameSpec;
                    } else {
                        secondNewest = gameSpec;
                    }
                } else if (thirdNewest === undefined) {
                    if (gameSpec.createdOn > newest.createdOn) {
                        thirdNewest = secondNewest;
                        secondNewest = newest;
                        newest = gameSpec;
                    } else if (gameSpec.createdOn > secondNewest.createdOn) {
                        thirdNewest = secondNewest;
                        secondNewest = gameSpec;
                    } else {
                        thirdNewest = gameSpec;
                    }
                } else {
                    if (gameSpec.createdOn > newest.createdOn) {
                        thirdNewest = secondNewest;
                        secondNewest = newest;
                        newest = gameSpec;
                    } else if (gameSpec.createdOn > secondNewest.createdOn) {
                        thirdNewest = secondNewest;
                        secondNewest = gameSpec;
                    } else if (gameSpec.createdOn > thirdNewest.createdOn) {
                        thirdNewest = gameSpec;
                    }
                }
            }
        }

        this.getGameIcon(newest).then(gameIcon => {
            addRecentlyAddedGame({
                'gameName': newest.gameName,
                'gameSpecId': newest.gameSpecId,
                'gameIcon': gameIcon
            })
        });

        this.getGameIcon(secondNewest).then(gameIcon => {
            addRecentlyAddedGame({
                'gameName': secondNewest.gameName,
                'gameSpecId': secondNewest.gameSpecId,
                'gameIcon': gameIcon
            })
        });

        this.getGameIcon(thirdNewest).then(gameIcon => {
            addRecentlyAddedGame({
                'gameName': thirdNewest.gameName,
                'gameSpecId': thirdNewest.gameSpecId,
                'gameIcon': gameIcon
            })
        });
    }

    loadPreviouslyPlayed() {
        const { gameSpecs, matches, addPreviouslyPlayedGame, resetPreviouslyPlayedGames } = this.props;

        resetPreviouslyPlayedGames();

        let matchesAsArray = [];

        for (let matchId in matches) {
            if (matches.hasOwnProperty(matchId)) {
                let match = matches[matchId];
                match['matchId'] = matchId;
                matchesAsArray.push(match);
            }
        }

        matchesAsArray.sort((a, b) => {
            return b.lastUpdatedOn - a.lastUpdatedOn;
        });


        let lastPlayed = undefined;
        let secondLastPlayed = undefined;
        let thirdLastPlayed = undefined;

        for (let i = 0; i < matchesAsArray.length; i++) {
            let match = matchesAsArray[i];

            if (lastPlayed === undefined) {
                lastPlayed = match.gameSpecId;
            } else if (secondLastPlayed === undefined) {
                if (lastPlayed !== match.gameSpecId) {
                    secondLastPlayed = match.gameSpecId;
                }
            } else if (thirdLastPlayed === undefined) {
                if (lastPlayed !== match.gameSpecId && secondLastPlayed !== match.gameSpecId) {
                    thirdLastPlayed = match.gameSpecId;
                    break;
                }
            }
        }

        if (lastPlayed !== undefined) {
            this.getGameIcon(gameSpecs[lastPlayed]).then(gameIcon => {
                addPreviouslyPlayedGame({
                    'gameName': gameSpecs[lastPlayed].gameName,
                    'gameSpecId': lastPlayed,
                    'gameIcon': gameIcon
                });
            });
        }

        if (secondLastPlayed !== undefined) {
            this.getGameIcon(gameSpecs[secondLastPlayed]).then(gameIcon => {
                addPreviouslyPlayedGame({
                    'gameName': gameSpecs[secondLastPlayed].gameName,
                    'gameSpecId': secondLastPlayed,
                    'gameIcon': gameIcon
                });
            });
        }

        if (thirdLastPlayed !== undefined) {
            this.getGameIcon(gameSpecs[thirdLastPlayed]).then(gameIcon => {
                addPreviouslyPlayedGame({
                    'gameName': gameSpecs[thirdLastPlayed].gameName,
                    'gameSpecId': thirdLastPlayed,
                    'gameIcon': gameIcon
                });
            });
        }
    }
}