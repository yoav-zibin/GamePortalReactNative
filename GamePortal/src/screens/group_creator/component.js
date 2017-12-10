import React, {Component} from "react";
import styles from "../../frontend/styles/common_style";
import {Alert, AsyncStorage, Button, Text, TextInput, View} from "react-native";
import * as firebase from "firebase/index";

export default class CreateGroupComponent extends Component {

    constructor() {
        super();
        this.groupName = "";
    }

    render() {
        return (
            <View style={styles.container}>
                {CreateGroupComponent.renderHead()}
                {this.renderBody()}
            </View>
        );
    }

    static renderHead() {
        return (
            <View style={styles.topBar}>
                <Text style={styles.header}>Create Group</Text>
            </View>
        );
    }

    renderBody() {
        return (
            <View style={styles.viewContainer}>
                {this.renderWithUsers()}
                {this.renderGroupNameEntry()}
                {this.renderCreateGroupButton()}
                {this.renderCancelGroupButton()}
            </View>
        );
    }

    renderWithUsers() {
        const { createGroupUsers } = this.props;
        let users = "";
        createGroupUsers.forEach(user => users += "\t⦿\t" + user.displayName + "\n");

        return (
            <View>
                <Text style={styles.header}>With Users</Text>
                <Text>{users}</Text>
            </View>
        );
    }

    renderGroupNameEntry() {
        return (
            <View>
                <Text style={styles.header}>Group Name</Text>
                <TextInput style={styles.textInput}
                           onChangeText = { (text) => this.groupName = text }
                />
            </View>
        );
    }

    renderCreateGroupButton() {
        return (
            <View>
                <Text>
                    {'\n'}
                </Text>

                <Button
                    onPress = {() => {
                        Alert.alert(
                            'Confirm',
                            'Create group "' + this.groupName + '"?',
                            [
                                {text: 'Create', onPress: () => this.createGroup()},
                                {text: 'Cancel'}
                            ]
                        );
                    }}
                    title="Create Group"
                />
            </View>
        );
    }

    renderCancelGroupButton() {
        return (
            <View>
                <Text>
                    {'\n'}
                </Text>

                <Button
                    onPress = {() => {
                        Alert.alert(
                            'Confirm',
                            'Cancel group "' + this.groupName + '"?',
                            [
                                {text: 'Yes', onPress: () => this.cancelGroup()},
                                {text: 'No'}
                            ]
                        )
                    }}
                    title = "Cancel"
                    color = "#841584"
                />
            </View>
        );
    }

    createGroup() {

        const { addGroup, switchChatRoom, switchScreen, createGroupUsers } = this.props;

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

            this.cleanUp();

            switchChatRoom(group);
            switchScreen('Chat');
        });
    }

    cancelGroup() {
        const { switchScreen } = this.props;
        this.cleanUp();
        switchScreen('Home');
    }

    cleanUp() {
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
}