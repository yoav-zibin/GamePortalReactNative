import React, {Component} from "react";
import {ScrollView, Text, View} from "react-native";
import styles from "../../../frontend/styles/common_style";
import {List, ListItem} from 'react-native-elements';

export default class CurrentMatchesTabComponent extends Component {
    render() {

        const { gameSpecs } = this.props;

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
                                    onPress={() => alert(game.gameSpecId)}
                                />
                            ))
                        }
                    </List>
                </ScrollView>
            </View>
        );
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