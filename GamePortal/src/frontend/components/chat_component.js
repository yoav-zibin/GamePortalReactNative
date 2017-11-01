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
        const { user, group, addMessages, resetMessages } = this.props;
        let groupId = group.groupId;
        resetMessages();
        firebase.database().ref('gamePortal/groups/' + groupId)
                           .child('messages')
                           .on('value', (snapshot) => {
                               setTimeout(() => {
                                   const messages = snapshot.val() || [];
                                   for (let m in messages) {
                                       console.log(messages[m]);
                                       addMessages(messages[m]);
                                   }
                                }, 0);
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
        console.log(messages);

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