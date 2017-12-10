import React, {Component} from "react";
import styles from "../../../frontend/styles/common_style";
import {View, Button, ScrollView, Text, AsyncStorage} from "react-native";
import {List, ListItem} from 'react-native-elements';
import * as firebase from "firebase/index";
import {getPublicFields} from "../../../backend/users/public_fields";

export default class ActiveUsersTabComponent extends Component {

    componentWillMount() {
        AsyncStorage.getItem('userData').then(udJSON => {
            let userData = JSON.parse(udJSON);
            let myUserId = userData.firebaseUserId;

            firebase.database().ref('gamePortal/recentlyConnected').on('value', recentlyConnectedUsers => {
                let rcuParsed = recentlyConnectedUsers.val();
                this.loadRecentlyConnected(myUserId, rcuParsed);
            });
        });
    }

    loadRecentlyConnected(myUserId, connectionList) {
        const {addRecentlyConnectedUser} = this.props;

        for (let connectionId in connectionList) {

            if (connectionList.hasOwnProperty(connectionId)) {
                let connection = connectionList[connectionId];
                let userId = connection.userId;

                if (userId === myUserId) {
                    continue;
                }

                getPublicFields(userId).then(publicFields => {

                    if (publicFields !== null) {
                        //set connected users as list
                        addRecentlyConnectedUser({
                            displayName: publicFields.displayName,
                            avatarURL: publicFields.avatarImageUrl,
                            userId: userId,
                            selected: false,
                            timestamp: connection.timestamp,
                            online: publicFields.isConnected
                        });
                    }
                }).catch(error => alert(error));
            }
        }
    }

    render() {
        return (
            <View>
                {this.renderActiveUsers()}
                {this.renderCreateGroupButton()}
            </View>
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
                                label={(<Text style={rcu.online ? styles.online : styles.offline}>{"███"}</Text>)}
                            />
                        ))
                    }
                </List>
            </ScrollView>
        );
    }

    renderCreateGroupButton() {
        const {recentlyConnectedUsers} = this.props;

        let selectedUsers = [];
        for (let i = 0; i < recentlyConnectedUsers.length; i++) {
            if (recentlyConnectedUsers[i].selected) {
                selectedUsers.push(recentlyConnectedUsers[i]);
            }
        }

        if (selectedUsers.length > 0) {
            return (
                <View style={styles.createGroupView}>
                    <Button
                        onPress={() => this.createGroup(selectedUsers)}
                        disabled={selectedUsers.length === 0}
                        title="Create Group"
                    />
                </View>
            );
        }

        return undefined;
    }

    createGroup(selectedUsers) {
        const {setCreateGroupUsers, switchScreen} = this.props;

        setCreateGroupUsers(selectedUsers);
        switchScreen('CreateGroup');
    }

}