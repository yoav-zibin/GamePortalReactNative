import React, {Component} from 'react';

import {
    Alert,
    AsyncStorage,
    FlatList,
    Text,
    View,
    TextInput,
    Button
} from 'react-native';
import styles from "../styles/common_style";

import * as firebase from 'firebase';

export default class CreateGroupComponent extends Component {

    constructor(props){
        super();
        this.groupName = "";
        this.openingMessage = "";
    }

    _createGroup() {

        const { addGroup, addMessage, switchChatRoom, switchScreen, createGroupUsers } = this.props;

        if (this.groupName.trim() === "") {
            alert("Group name cannot be empty");
            return;
        }

        AsyncStorage.getItem('userData').then(udJSON => {

            let userData = JSON.parse(udJSON);
            let creatorId = userData.firebaseUserId;
            let createdOn = firebase.database.ServerValue.TIMESTAMP;

            let groupsRef = firebase.database().ref('gamePortal/groups/');

            let participants = {};
            participants[creatorId] = {participantIndex: 0};
            for (let p = 0; p < createGroupUsers.length; p++) {
                let participant = createGroupUsers[p];
                participants[participant.userId] = {participantIndex: p + 1};
            }

            let group = {
                participants: participants,
                groupName: this.groupName.trim(),
                createdOn: createdOn,
                messages: {},
                matches: ''
            };

            let groupId = groupsRef.push(group).key;

            firebase.database().ref('users/' + creatorId + '/privateButAddable/groups/' + groupId).set({
                addedByUid: creatorId,
                timestamp: createdOn
            });

            for (let i = 0; i < createGroupUsers.length; i++) {
                let uid = createGroupUsers[i].userId;
                firebase.database().ref('users/' + uid + '/privateButAddable/groups/' + groupId).set({
                    addedByUid: creatorId,
                    timestamp: createdOn
                });
            }


            group['groupId'] = groupId;
            addGroup(group);

            if (this.openingMessage.trim() !== "") {
                let message = {
                    message: this.openingMessage.trim(),
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
                    senderUid: creatorId
                };

                firebase.database().ref('gamePortal/groups/' + groupId + '/messages').push(message);
                addMessage(message);
            }

            this._cleanUp();

            switchChatRoom(group);
            switchScreen('Chat');
        });
    }

    _cancelGroup() {
        const { switchScreen } = this.props;

        this._cleanUp();
        switchScreen('Home');
    }

    _cleanUp() {
        const {switchSelectUser, recentlyConnectedUsers, setCreateGroupUsers} = this.props;
        //reset create group
        setCreateGroupUsers([]);

        //disable all user switches on home screen
        recentlyConnectedUsers.forEach(rcu => {
            if (rcu.selected) {
                switchSelectUser(rcu.userId)
            }
        })
    }

    render() {
        const { createGroupUsers } = this.props;

        let users = "";

        createGroupUsers.forEach(user => users += "\t⦿\t" + user.displayName + "\n");

        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <Text style={styles.header}>Create Group</Text>
                </View>

                <View style={styles.viewContainer}>
                    <Text style={styles.header}>With Users</Text>
                    <Text>{users}</Text>

                    <Text style={styles.header}>Group Name</Text>
                    <TextInput style={styles.textInput}
                        onChangeText = { (text) => this.groupName = text }
                    />

                    <Text style={styles.header}>Opening Message (optional)</Text>
                    <TextInput style={styles.textInput}
                        onChangeText = { text => this.openingMessage = text}
                    />

                    <Text>
                        {'\n'}
                    </Text>

                    <Button
                        onPress = {() => {
                            Alert.alert(
                                'Confirm',
                                'Create group "' + this.groupName + '"?',
                                [
                                    {text: 'Create', onPress: () => this._createGroup()},
                                    {text: 'Cancel'}
                                ]
                            );
                        }}
                        title="Create Group"
                    />


                    <Text>
                        {'\n'}
                    </Text>

                    <Button
                        onPress = {() => {
                            Alert.alert(
                                'Confirm',
                                'Cancel group "' + this.groupName + '"?',
                                [
                                    {text: 'Yes', onPress: () => this._cancelGroup()},
                                    {text: 'No'}
                                ]
                            )
                        }}
                        title = "Cancel"
                        color = "#841584"
                    />
                </View>
            </View>
        );
    }
}