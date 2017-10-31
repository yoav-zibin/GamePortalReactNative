import React, {Component} from 'react';

import ReactNative from 'react-native';

import { List, ListItem } from 'react-native-elements';
import NavigationBar from 'react-native-navbar';
import { AsyncStorage, Button, Image, Text, View, TextInput, FlatList } from 'react-native';
import { getGroupMessages, getMessageObject } from '../../backend/users/groups';

import * as firebase from 'firebase';

import styles from '../styles/common_style'

export default class ChatComponent extends Component {

    constructor(props) {
        super(props);
        this.text = "";
    }

    componentWillMount() {
        const { user, group, fetchMessages, addMessages, resetMessages } = this.props;
        resetMessages();
        AsyncStorage.getItem('userData').then(udJSON => {
            let userData = JSON.parse(udJSON);
            let myUserId = userData.firebaseUserId;
            let groupId = group.groupId;

            getGroupMessages(groupId).then(groupMessages => {
                for (let messageId in groupMessages) {
                    getMessageObject(messageId, groupId).then(message => {
                        message.messageId = messageId;
                        addMessages(message);
                    }).catch(error => alert(error));
                }
            });
        });
    }

    _sendMessage() {
        const { sendMessage } = this.props;
        const { user, group } = this.props;
        let msgInfo = {
            text: this.text,
            senderId: user.firebaseUserId,
            groupId: group.groupId
        }
        sendMessage(msgInfo);
    }

    render() {
        const { user, group, messages, avatarURL, switchScreen, loading } = this.props;

        if (loading) {
            return (
                <View style={styles.container} >
                    <Text style={styles.header}>
                        Loading chat information
                    </Text>
                </View>
            );
        }

        return (

            <View style={styles.headerContainer}>
                <NavigationBar
                    title={{title: group.groupName}}
                    rightButton={{
                        title: 'Back',
                        handler: () => switchScreen('Home')
                    }}
                />
                <TextInput
                        onChangeText = { (text) => this.text = text }
                        onSubmitEditing = { () => this._sendMessage() }
                        placeholder = "Say something..."
                        style={styles.textInput}
                />
                <List>
                    <FlatList
                        data = { messages }
                        keyExtractor = {item => item.messageId}
                        renderItem = {({ item }) => (
                            <ListItem
                            roundAvatar
                            title = {`${item.message}`}
                            subtitle = {`${item.senderUid}`}
                            />
                        )}
                    />
                </List>
            </View>
        );
    }
}