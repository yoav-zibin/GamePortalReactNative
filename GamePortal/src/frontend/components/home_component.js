import React, {Component} from 'react';

import { AsyncStorage, Button, Image, Text, View } from 'react-native';
import Tabs from 'react-native-tabs';

import * as firebase from 'firebase';

import styles from '../styles/common_style'
import { getRecentlyConnected } from "../../backend/users/recently_connected";
import { getPublicFields } from "../../backend/users/public_fields";

export default class HomeComponent extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {

        console.log("Called");

        const { addRecentlyConnectedUser, resetRecentlyConnectedUsers } = this.props;
        resetRecentlyConnectedUsers();


        AsyncStorage.getItem('userData').then(udJSON => {
            let userData = JSON.parse(udJSON);

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
        });
    }


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

    _goChatting() {
        // Screen actions
        const { switchScreen } = this.props;
        // TODO: load last time chat room data
        switchScreen('ChatRoom');
    }

    _createGroup(firebaseUserId) {

        let idSuffix = (Math.random().toString() + 'abcd').substr(2);
        let groupName = 'test_group_name';

        firebase.database().ref('gamePortal/groups/' + idSuffix).set({
            participants: {
                [firebaseUserId]: {participantIndex: 0}
            },
            groupName: groupName,
            createdOn: firebase.database.ServerValue.TIMESTAMP,
        });
    }

    _renderTab() {
        const { tab, recentlyConnectedUsers, switchSelectUser } = this.props;

        switch(tab) {
            case 'tabChats':
                // AsyncStorage.getItem('userData').then(udJSON => {
                //     let userData = JSON.parse(udJSON);

                //     getRecentlyConnected().then(connectionList => {
                //         for (let connectionId in connectionList) {
                            
                //         }
                //     })
                // })
                return (
                    <View>
                        <Button 
                            style={styles.chatButton}
                            onPress={() => this._createGroup(firebaseUserId)}
                            title="Create New Group"
                        />
                        
                    </View>
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
                        createGroup = (
                            <Button
                                onPress = {() => alert("Create Group")}
                                title="Create Group"
                            />
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