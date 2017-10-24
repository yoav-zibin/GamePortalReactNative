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

    _renderTab() {
        const { tab, recentlyConnectedUsers, setRecentlyConnectedUsers } = this.props;

        switch(tab) {
            case 'tabChats':
                return (
                    <View>
                        <Text>Chats</Text>
                    </View>
                );
            case 'tabFriends':
                return (
                  <View>
                      <Text>Friends</Text>
                  </View>
                );
            case 'tabActive':

                AsyncStorage.getItem('userData').then(udJSON => {
                   let userData = JSON.parse(udJSON);

                    getRecentlyConnected().then(connectionList => {

                        for (let connectionId in connectionList) {
                            let broken = false;

                            if (connectionList.hasOwnProperty(connectionId)) {
                                let connection = connectionList[connectionId];
                                let userId = connection.userId;

                                if (userId === userData.firebaseUserId) {
                                    continue;
                                }

                                getPublicFields(userId).then(publicFields => {

                                    if (JSON.stringify(publicFields) !== 'null') {
                                        //get the current connected users
                                        let updatedList = [];

                                        if (recentlyConnectedUsers !== null) {
                                            for (let u = 0; u < recentlyConnectedUsers.length; u++) {
                                                if (recentlyConnectedUsers[u].userId !== userId) {
                                                    updatedList.push(recentlyConnectedUsers[u]);
                                                } else {
                                                    broken = true;
                                                    break;
                                                }
                                            }

                                            if (broken) {
                                                return;
                                            }
                                        }

                                        while (updatedList.length >= 20) {
                                            updatedList.pop();
                                        }

                                        //add user to top
                                        updatedList.unshift({
                                            userId: userId,
                                            displayName: publicFields.displayName,
                                            avatarURL: publicFields.avatarImageUrl ? publicFields.avatarImageUrl : null
                                        });

                                        //set connected users as list
                                        setRecentlyConnectedUsers(updatedList);
                                    }

                                }).catch(error => alert(error));
                            }
                        }
                    }).catch(error => alert(error));
                });



                let users = [];
                if (recentlyConnectedUsers !== null && recentlyConnectedUsers.length > 0) {
                    //draw recently connected users

                    for (let u = 0; u < recentlyConnectedUsers.length; u++) {
                        let user = recentlyConnectedUsers[u];

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


                                <Button
                                    onPress = {() => alert("Select")}
                                    title="Select"
                                    color="#62B36C"
                                />
                            </View>
                        );

                        users.push(userElement);
                    }

                    return (
                      <View style={styles.container}>
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