import React, {Component} from 'react';

import {
    AsyncStorage,
    Button,
    Image,
    Text,
    TextInput,
    View,
    ScrollView
} from 'react-native';

import {List, ListItem} from 'react-native-elements';

import Tabs from 'react-native-tabs';

import * as firebase from 'firebase';

import styles from '../styles/common_style'
import {getPublicFields} from "../../backend/users/public_fields";
import {getGroup} from '../../backend/users/groups';

export default class HomeComponent extends Component {

    constructor(props) {
        super(props);
        this.localGroupName = ''
    }

    _loadRecentlyConnected(myUserId, connectionList) {

        const {addRecentlyConnectedUser, recentlyConnectedUsers} = this.props;

        for (let connectionId in connectionList) {

            if (connectionList.hasOwnProperty(connectionId)) {
                let connection = connectionList[connectionId];
                let userId = connection.userId;

                if (userId === myUserId) {
                    continue;
                }

                getPublicFields(userId).then(publicFields => {

                    if (JSON.stringify(publicFields) !== 'null') {
                        //set connected users as list
                        addRecentlyConnectedUser({
                            displayName: publicFields.displayName,
                            avatarURL: publicFields.avatarImageUrl,
                            userId: userId,
                            selected: false,
                            timestamp: connection.timestamp
                        });
                    }
                }).catch(error => alert(error));
            }
        }
    }

    _getGroups(myGroups) {

        const {addGroup} = this.props;

        for (let groupId in myGroups) {

            if (myGroups.hasOwnProperty(groupId)) {
                getGroup(groupId).then(response => {
                    let group = {};

                    group.groupId = groupId;
                    group.groupName = response.groupName;
                    group.messages = response.messages === '' ? {} : response.messages;
                    group.createdOn = response.createdOn;
                    group.participants = response.participants === '' ? {} : response.participants;


                    addGroup(group);
                }).catch(error => console.log(error));
            }
        }
    }

    componentWillMount() {

        // actions
        const { resetGroups } = this.props;

        AsyncStorage.getItem('userData').then(udJSON => {
            let userData = JSON.parse(udJSON);
            let myUserId = userData.firebaseUserId;

            firebase.database().ref('gamePortal/recentlyConnected').on('value', recentlyConnectedUsers => {
                let jsonString = JSON.stringify(recentlyConnectedUsers);
                let rcuParsed = JSON.parse(jsonString);

                this._loadRecentlyConnected(myUserId, rcuParsed);
            });

            firebase.database().ref('users/' + myUserId + '/privateButAddable/groups').on('value', value => {
                let pfJSON = JSON.stringify(value);
                let myGroups = JSON.parse(pfJSON);

                this._getGroups(myGroups);
            });
        });
    }

    _signOut() {

        console.ignoredYellowBox = ['Setting a timer'];

        const {setLoading, setLoggedOut, switchScreen} = this.props; //actions
        const {userId} = this.props;
        setLoading(true);

        firebase.database().ref('/users/' + userId + '/publicFields').once('value').then(response => {
            let rJSON = JSON.stringify(response);
            let r = JSON.parse(rJSON);

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

    _goChatting(group) {
        const {switchChatRoom, switchScreen} = this.props;
        // Update current group
        switchChatRoom(group);
        switchScreen('Chat');
    }

    _createGroup(users) {

        const {setCreateGroupUsers, switchScreen} = this.props;

        //set users in group in global state
        setCreateGroupUsers(users);
        switchScreen('CreateGroup');


        /*switch to screen for creating group with these users

        AsyncStorage.getItem('userData').then(udJSON => {

            let userData = JSON.parse(udJSON);
            let creatorId = userData.firebaseUserId;
            let createdOn = firebase.database.ServerValue.TIMESTAMP;

            let groupsRef = firebase.database().ref('gamePortal/groups/');

            let participants = {};
            participants[creatorId] = {participantIndex: 0};
            for (let p = 0; p < users.length; p++) {
                let participant = users[p];
                participants[participant.userId] = {participantIndex: p + 1};
            }

            let group = {
                participants: participants,
                groupName: groupName,
                createdOn: createdOn,
                messages: {},
                matches: ''
            };

            let groupId = groupsRef.push(group).key;

            firebase.database().ref('users/' + creatorId + '/privateButAddable/groups/' + groupId).set({
                addedByUid: creatorId,
                timestamp: createdOn
            });

            for (let i = 0; i < users.length; i++) {
                let uid = users[i].userId;
                firebase.database().ref('users/' + uid + '/privateButAddable/groups/' + groupId).set({
                    addedByUid: creatorId,
                    timestamp: createdOn
                });
            }


            group['groupId'] = groupId;
            addGroup(group);
            this._goChatting(group);
        });
        */
    }

    renderGroups() {
        const {groups} = this.props;

        return (
            <ScrollView>
                <List>
                    {
                        groups.map((group, index) => (
                            <ListItem
                                roundAvatar
                                key={index}
                                title={group.groupName}
                                onPress={() => this._goChatting(group)}
                                hideChevron={true}
                            />
                        ))
                    }
                </List>
            </ScrollView>
        );
    }

    renderActiveUsers() {
        const {recentlyConnectedUsers, switchSelectUser} = this.props;

        return (
            <ScrollView>
                <List>
                    {
                        recentlyConnectedUsers.map((rcu, index) => (
                            <ListItem
                                roundAvatar
                                avatar={{uri: rcu.avatarURL}}
                                key={index}
                                title={rcu.displayName}
                                hideChevron={true}
                                switchButton={true}
                                switchOnTintColor="#62B36C"
                                switched={rcu.selected}
                                onSwitch={() => switchSelectUser(rcu.userId)}
                            />
                        ))
                    }
                </List>
            </ScrollView>
        );
    }

    _renderTab() {
        const {tab, recentlyConnectedUsers} = this.props;

        switch (tab) {
            case 'tabChats':
                let myGroups = this.renderGroups();
                return (
                    <View>
                        {myGroups}
                    </View>
                );
            case 'tabFriends':
                return (
                    <View>
                        <Text>Friends</Text>
                    </View>
                );
            case 'tabActive':

                let selectedUsers = [];
                for (let i = 0; i < recentlyConnectedUsers.length; i++) {
                    if (recentlyConnectedUsers[i].selected) {
                        selectedUsers.push(recentlyConnectedUsers[i]);
                    }
                }

                let createGroupButton = undefined;

                if (selectedUsers.length > 0) {
                    createGroupButton = (
                        <View style={styles.createGroupView}>
                            <Button
                                onPress={() => this._createGroup(selectedUsers, this.localGroupName)}
                                disabled={selectedUsers.length === 0}
                                title="Create Group"
                            />
                        </View>
                    );
                }

                let activeUsers = this.renderActiveUsers();

                return (
                    <View>
                        {activeUsers}
                        {createGroupButton}
                    </View>
                );
            default:
                return (
                    <View>
                        <Text>Search</Text>
                    </View>
                );
        }
    }


    render() {

        const {username, avatarURL, loading, tab} = this.props;
        const {switchTab} = this.props;

        if (loading) {
            return (
                <View style={styles.container}>
                    <Text style={styles.header}>
                        Please Wait
                    </Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>

                <View style={styles.topBar}>
                    <Image
                        style={styles.profilePicture}
                        source={{uri: avatarURL}}
                    />

                    <Text style={styles.header}>{username}</Text>

                    <Button
                        style={styles.signoutButton}
                        onPress={() => this._signOut()}
                        title="Sign Out"
                        color="#841584"
                    />
                </View>

                <View style={styles.tabbedContainer}>

                    {this._renderTab()}


                    <Tabs
                        selected={tab}
                        style={styles.tabButton}
                        selectedStyle={styles.tabButtonSelected}
                        onSelect={selected => switchTab(selected.props.name)}
                    >
                        <Text name="tabChats">Chats</Text>
                        <Text name="tabFriends">Friends</Text>
                        <Text name="tabActive">Active</Text>
                        <Text name="tabSearch">Search</Text>
                    </Tabs>
                </View>

            </View>);
    }
}