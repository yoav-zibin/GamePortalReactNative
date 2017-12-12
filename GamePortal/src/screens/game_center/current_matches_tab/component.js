import React, {Component} from "react";
import {ScrollView, Text, View} from "react-native";
import styles from "../../../frontend/styles/common_style";
import {List, ListItem} from 'react-native-elements';

export default class CurrentMatchesTabComponent extends Component {
    render() {

        const { gameForOngoingMatches } = this.props;

        if (gameForOngoingMatches === null) {
            return this.renderGameList();
        } else {
            return this.renderMatchList();
        }
    }

    renderGameList() {

        const {gameSpecs, setGameForOngoingMatches } = this.props;

        let currentGames = this.sortAndGroupMatchesByGame();

        if (currentGames.length === 0) {
            return (
                <View style={styles.container}>
                    <Text>
                        This group has no games in progress
                    </Text>
                </View>
            );
        }

        return (
            <View>
                <ScrollView>
                    <List>
                        {
                            currentGames.map((game, index) => (
                                <ListItem
                                    roundAvatar
                                    key={index}
                                    title={gameSpecs[game.gameSpecId]['gameName']}
                                    subtitle={game.matches.length + " games in progress"}
                                    avatar={{uri: gameSpecs[game.gameSpecId]['gameIcon50x50']}}
                                    onPress={() => setGameForOngoingMatches(game.gameSpecId)}
                                />
                            ))
                        }
                    </List>
                </ScrollView>
            </View>
        );
    }

    renderMatchList() {
        let { gameForOngoingMatches } = this.props;

        let currentGames = this.sortAndGroupMatchesByGame();

        for (let i = 0; i < currentGames.length; i++) {
            if (currentGames[i].gameSpecId === gameForOngoingMatches) {
                let matches = currentGames[i].matches;

                return (
                    <View>
                        <ScrollView>
                            <List>
                                {
                                    matches.map((match, index) => (
                                        <ListItem
                                            key={index}
                                            title={match.matchId}
                                            subtitle={"Move last made: " + match.lastUpdatedOn}
                                            onPress={() => this.goToMatch(gameForOngoingMatches, match.matchId)}
                                        />
                                    ))
                                }
                            </List>
                        </ScrollView>
                    </View>
                );
            }
        }

        return (
            <View>
                <Text>
                    No ongoing matches for game
                </Text>
            </View>
        );
    }

    goToMatch(gameId, matchId) {
        const { setGameSpecId, setMatchId, switchScreen } = this.props;
        setGameSpecId(gameId);
        setMatchId(matchId);
        switchScreen('GameRenderer')
    }

    sortAndGroupMatchesByGame() {

        const {matches} = this.props;

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

        let gamesArray = [];
        let gamesMap = {};

        matchesAsArray.forEach(match => {
            let gameSpecId = match.gameSpecId;

            if (!gamesMap.hasOwnProperty(gameSpecId)) {
                gamesArray.push({"gameSpecId": gameSpecId});
                gamesMap[gameSpecId] = [];
            }

            gamesMap[gameSpecId].push(match);
        });

        for (let i = 0; i < gamesArray.length; i++) {
            let gameSpecId = gamesArray[i].gameSpecId;
            gamesArray[i].matches = gamesMap[gameSpecId];
        }

        return gamesArray;
    }
}