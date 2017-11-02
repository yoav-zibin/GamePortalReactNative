import React, {Component} from 'react';
import {List, ListItem} from 'react-native-elements';
import NavigationBar from 'react-native-navbar';
import {Text, View, TextInput, ScrollView} from 'react-native';

import * as firebase from 'firebase';

import styles from '../styles/common_style'

export default class ChatComponent extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const {groupId, addMessage, resetMessages} = this.props;
        resetMessages();
        firebase.database().ref('gamePortal/groups/' + groupId)
            .child('messages')
            .on('value', (snapshot) => {
                setTimeout(() => {
                    resetMessages();
                    const messages = snapshot.val() || [];
                    for (let messageId in messages) {
                        if (messages.hasOwnProperty(messageId)) {
                            addMessage(messages[messageId]);
                        }
                    }
                }, 0);
            });
    }

    _sendMessage(messageText) {
        const {addMessage} = this.props;
        const {user, groupId} = this.props;

        let message = {
            message: messageText,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            senderUid: user.firebaseUserId
        };

        this.textInput.clear();
        firebase.database().ref('gamePortal/groups/' + groupId + '/messages').push(message);
        addMessage(message);
    }

    render() {
        const {user, groupName, messages, avatarURL, switchScreen, loading} = this.props;

        if (loading) {
            return (
                <View style={styles.container}>
                    <Text style={styles.header}>
                        Loading chat information
                    </Text>
                </View>
            );
        }

        let newMessage = "";

        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <NavigationBar
                        title={{title: groupName}}
                        rightButton={{
                            title: 'Back',
                            handler: () => switchScreen('Home')
                        }}
                    />
                </View>

                <ScrollView styles={styles.chatRoom}>
                    <List style={styles.chatMessages}>
                        {
                            messages.map((message, index) => (
                                <ListItem
                                    roundAvatar
                                    avatar={{uri: message.avatarURL}}
                                    key={index}
                                    title={message.message}
                                    subtitle={message.timestamp instanceof Object ? "SENDING" : message.timestamp}
                                    hideChevron={true}
                                />
                            ))
                        }
                    </List>
                </ScrollView>

                <TextInput
                    ref={input => { this.textInput = input }}
                    onChangeText={text => newMessage = text}
                    onSubmitEditing={() => this._sendMessage(newMessage)}
                    placeholder="Say something..."
                    style={styles.textInput}
                />

            </View>

        );
    }
}