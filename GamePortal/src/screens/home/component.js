import React, {Component} from "react";
import styles from "../../resources/styles/common_style";
import {AsyncStorage, Button, Image, Text, View} from "react-native";
import Tabs from 'react-native-tabs';
import {ActiveUsersTabContainer} from "./active_users_tab/container";
import {GroupsTabContainer} from "./groups_tab/container";
import * as firebase from "firebase/index";

export default class HomeComponent extends Component {

    render() {
        const {loading} = this.props;

        if (loading) {
            return HomeComponent.renderLoading();
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
                    Please Wait
                </Text>
            </View>
        );
    }

    renderHead() {
        const {avatarURL, username} = this.props;

        return (
            <View style={styles.topBar}>
                <Image
                    style={styles.profilePicture}
                    source={{uri: avatarURL}}
                />

                <Text style={styles.header}>{username}</Text>

                <Button
                    style={styles.signOutButtonHome}
                    onPress={() => this.signOut()}
                    title="Sign Out"
                    color="#841584"
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
                    <Text name="tabGroups">My Groups</Text>
                    <Text name="tabActive">Active Users</Text>
                </Tabs>
            </View>
        );
    }

    renderTab() {
        const { tab } = this.props;

        switch (tab) {
            case 'tabGroups': {
                return (<GroupsTabContainer />);
            }

            default: {
                return (<ActiveUsersTabContainer />)
            }
        }
    }

    signOut() {
        console.ignoredYellowBox = ['Setting a timer'];

        const {setLoading, setLoggedOut, switchScreen} = this.props; //actions
        const {userId} = this.props;
        setLoading(true);

        firebase.database().ref('/users/' + userId + '/publicFields').once('value').then(response => {
            let r = response.val();

            r['isConnected'] = false;
            r['lastSeen'] = firebase.database.ServerValue.TIMESTAMP;

            firebase.database().ref('/users/' + userId + '/publicFields').set(r).then(() => {
                firebase.auth().signOut().catch(error => alert(error));
            }).catch(error => alert(error));
        }).catch(error => alert(error));

        AsyncStorage.removeItem('userData').then(() => { //Delete user from our storage
            setLoggedOut();
            setLoading(false);
            switchScreen('Splash');
        });
    }

}