import React, {Component} from 'react';

import {
    AsyncStorage, 
    Button, 
    Image, 
    Text, 
    TextInput,
    View,
    SectionList,
    FlatList,
    Header
} from 'react-native';

import { List, ListItem } from 'react-native-elements';
import NavigationBar from 'react-native-navbar';

import Tabs from 'react-native-tabs';

import * as firebase from 'firebase';

import styles from '../styles/common_style'
import { getRecentlyConnected } from "../../backend/users/recently_connected";
import { getPublicFields } from "../../backend/users/public_fields";
import { getMyGroups, getGroupObject } from '../../backend/users/groups';

export default class HomeComponent extends Component {

    constructor(props) {
        super(props);
        this.localGroupName = ''
    }

    componentWillMount() {

        // actions
        const { addMyGroups, addRecentlyConnectedUser, resetRecentlyConnectedUsers } = this.props;
        resetRecentlyConnectedUsers();

        AsyncStorage.getItem('userData').then(udJSON => {
            let userData = JSON.parse(udJSON);
            let myUserId = userData.firebaseUserId;

            getRecentlyConnected().then(connectionList => {

                for (let connectionId in connectionList) {

                    if (connectionList.hasOwnProperty(connectionId)) {
                        let connection = connectionList[connectionId];
                        let userId = connection.userId;

                        if (userId === userData.firebaseUserId) {
                            continue;
                        }

                        getPublicFields(userId).then(publicFields => {

                            if (JSON.stringify(publicFields) !== 'null') {
                                //set connected users as list
                                addRecentlyConnectedUser({
                                    displayName: publicFields.displayName,
                                    avatarURL: publicFields.avatarImageUrl,
                                    userId: userId,
                                    selected: false
                                });
                            }
                        }).catch(error => alert(error));
                    }
                }
            }).catch(error => alert(error));

            getMyGroups(myUserId).then(myGroupList => {

                for (let groupId in myGroupList) {

                    getGroupObject(groupId).then(group => {
                        group.groupId = groupId;
                        addMyGroups(group);
                    }).catch(error => alert(error));
                }

            }).catch(error => alert(error));
        });
    }

    // _retrieveMyData() {
    //     let data;
    //     AsyncStorage.getItem('userData').then(udJSON => {
    //         data = JSON.parse(udJSON);
    //     });
    //     return data;
    // }

    _signOut() {

        const { setLoading, setLoggedOut, switchScreen } = this.props; //actions
        setLoading(true);

        firebase.auth().signOut().catch((error) => {
            alert(error) //firebase failed signout
        });

        AsyncStorage.removeItem('userData').then(() => { //Delete user from our storage
            setLoggedOut();
            setLoading(false);
            switchScreen('Splash');
        });
    }

    _goChatting(group) {
        const { switchScreen, loadCurrentGroup } = this.props;
        // Update current group
        loadCurrentGroup(group);
        switchScreen('Chat');
    }

    _createGroup(users, groupName) {

        const { createGroup, addMyGroups } = this.props;

        AsyncStorage.getItem('userData').then(udJSON => {

            let userData = JSON.parse(udJSON);
            let creatorId = userData.firebaseUserId;
            let createdOn = firebase.database.ServerValue.TIMESTAMP;

            let idSuffix = (Math.random().toString() + 'xxxx').substr(2);

            let groupsRef = firebase.database().ref('gamePortal/groups/');

            let participants = {}
            participants[creatorId] = {participantIndex: 0};
            for (let p = 0; p < users.length; p++) {
                let participant = users[p];
                participants[participant.userId] = {participantIndex: p + 1};
            }

            let group = {
                participants: participants,
                groupName: groupName,
                createdOn: createdOn,
                messages: '',
                matches: ''
            }

            groupId = groupsRef.push(group).key;

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

            addMyGroups(group);
        });
    }

    _renderGroups() {
        const { myGroups } = this.props;
        return (
            <List>
                <FlatList
                    data = { myGroups }
                    keyExtractor = {item => item.groupId}
                    renderItem = {({ item }) => (
                        <ListItem
                        roundAvatar
                        title = {`${item.groupName}`}
                        subtitle = {`${item.createdOn}`}
                        onPress = {() => this._goChatting(item)}
                        />
                    )}
                />
            </List>
        );
    }

    _renderTab() {
        const { tab, recentlyConnectedUsers, switchSelectUser } = this.props;

        switch(tab) {
            case 'tabChats':
                return (
                    this._renderGroups()
                );
            case 'tabFriends':
                return (
                  <View>
                      <Text>Friends</Text>
                  </View>
                );
            case 'tabActive':
                let users = [];
                if (recentlyConnectedUsers !== null && recentlyConnectedUsers.length > 0) {

                    let oneSelected = false;
                    let selectedUsers = [];

                    // List all the active users
                    for (let u = 0; u < recentlyConnectedUsers.length; u++) {
                        let user = recentlyConnectedUsers[u];

                        let selectedButton = undefined;

                        if (user.selected) {
                            oneSelected = true;
                            selectedButton = (
                                <Button
                                    onPress = {() => switchSelectUser(user.userId)}
                                    title="Deselect"
                                    color="#FBB5B0"
                                />
                            );
                        } else {
                            selectedButton = (
                                <Button
                                    onPress = {() => switchSelectUser(user.userId)}
                                    title="Select"
                                    color="#62B36C"
                                />
                            );
                        }

                        let userElement = (
                            <View key={u} style={styles.listItemView}>
                                <Image
                                    style={styles.profilePicture}
                                    source={{uri: user.avatarURL}}
                                />
                                <Text>{user.displayName}</Text>

                                <Button
                                    onPress = {() => alert("Profile")}
                                    title="Profile"
                                    color="#B4B105"
                                />

                                {selectedButton}
                            </View>
                        );

                        users.push(userElement);
                    }

                    let createGroup = undefined;

                    if (oneSelected) {
                        // Create a new group with selected users
                        for (let u = 0; u < recentlyConnectedUsers.length; u++) {
                            let user = recentlyConnectedUsers[u];
                            if (user.selected) {
                                selectedUsers.push(user);
                            }
                        }

                        createGroup = (
                            // TODO: Need to add a page to initialize group info
                            <View>
                                <TextInput
                                    onChangeText = { (text) => this.localGroupName = text }
                                    placeholder = "Create a group name"
                                    style={styles.textInput}
                                />
                                <Button
                                    onPress = {() => this._createGroup(selectedUsers, this.localGroupName)}
                                    title="Create Group"
                                />
                            </View>
                        );    
                    }

                    return (
                      <View style={styles.container}>
                          {createGroup}
                          <Text>{'\n\n'}</Text>
                          {users}
                      </View>
                    );

                } else {
                    return (
                        <View style={styles.container}>
                            <Text>No Recently Connected Users</Text>
                        </View>
                    )
                }

                break;

            default:
                return (
                  <View>
                      <Text>Search</Text>
                  </View>
                );
        }
    }


    render() {

        const { username, avatarURL, loading, tab } = this.props;
        const { switchTab } = this.props;

        if (loading) {
            return (
              <View style={styles.container} >
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
                        onPress = {() => this._signOut()}
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