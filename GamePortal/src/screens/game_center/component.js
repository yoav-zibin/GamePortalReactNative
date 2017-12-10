import React, { Component } from 'react'
import {Text, View} from "react-native";
import NavigationBar from 'react-native-navbar';
import Tabs from 'react-native-tabs';
import styles from "../../frontend/styles/common_style";
import {CurrentMatchesTabContainer} from "./current_matches_tab/container";
import {NewMatchTabContainer} from "./new_match_tab/container";
import * as firebase from 'firebase';

export default class GameCenterComponent extends Component {

    componentWillMount() {
        const { setGameSpecs, setMatches, setLoading, groupId } = this.props;

        setLoading(true);


        firebase.database().ref('gameBuilder/gameSpecs/').once('value').then(gameSpecs => {

            let gameSpecsObj = {};
            gameSpecs.forEach(gameSpecRAW => {
                gameSpecsObj[gameSpecRAW.key] = gameSpecRAW.val();
            });

            setGameSpecs(gameSpecsObj);

            firebase.database().ref('gamePortal/groups/' + groupId + '/matches').on('value', matches => {
                let matchesObj = {};
                matches.forEach(matchRAW => {
                    matchesObj[matchRAW.key] = matchRAW.val();
                });

                setMatches(matchesObj);
                setLoading(false);
            });

        }).catch(error => alert(error));
    }

    render() {
        const { loading } = this.props;

        if (loading) {
            return GameCenterComponent.renderLoading();
        }

        return (
          <View style={styles.container}>
              {this.renderHead()}
              {this.renderBody()}
          </View>
        );
    }

    static renderLoading() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    Loading match history
                </Text>
            </View>
        );
    }

    renderHead() {
        const { switchScreen } = this.props;

        return(
            <View style={styles.headerContainer}>
                <NavigationBar
                    title={{title: 'Select a game'}}
                    rightButton={{
                        title: 'Back',
                        handler: () => switchScreen('Chat')
                    }}
                />
            </View>
        );
    }

    renderBody() {
        const { switchTab, tab} = this.props;

        return (
            <View style={styles.tabbedContainer}>

                {this.renderTab()}

                <Tabs
                    selected={tab}
                    style={styles.tabButton}
                    selectedStyle={styles.tabButtonSelected}
                    onSelect={selected => switchTab(selected.props.name)}
                >

                    <Text name="tabCurrentMatches">Current Matches</Text>
                    <Text name="tabNewMatch">New Match</Text>

                </Tabs>

            </View>
        );
    }

    renderTab() {
        const { tab } = this.props;

        switch (tab) {
            case 'tabCurrentMatches': {
                return (<CurrentMatchesTabContainer />);
            }

            default: {
                return (<NewMatchTabContainer />);
            }
        }
    }

}