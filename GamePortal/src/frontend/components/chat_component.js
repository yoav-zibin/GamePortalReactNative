import React, {Component} from 'react';
import {List, ListItem} from 'react-native-elements';
import NavigationBar from 'react-native-navbar';
import {Text, View, TextInput, ScrollView} from 'react-native';

import * as firebase from 'firebase';

import styles from '../styles/common_style'
import {getPublicFields} from '../../backend/users/public_fields';

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
                const messages = snapshot.val() || [];
                for (let messageId in messages) {
                    if (messages.hasOwnProperty(messageId)) {

                        let message = messages[messageId];
                        let userId = message.senderUid;

                        getPublicFields(userId).then(publicFields => {
                            addMessage({
                                id: messageId,
                                message: messages[messageId].message,
                                timestamp: messages[messageId].timestamp,
                                avatarURL: publicFields.avatarImageUrl
                            });

                        }).catch(error => alert(error));
                    }
                }
            });
    }

    static timeAgo(time) {

        switch (typeof time) {
            case 'number':
                break;
            case 'string':
                time = +new Date(time);
                break;
            case 'object':
                if (time.constructor === Date) time = time.getTime();
                break;
            default:
                time = +new Date();
        }
        let time_formats = [
            [60, 'seconds', 1], // 60
            [120, '1 minute ago', '1 minute from now'], // 60*2
            [3600, 'minutes', 60], // 60*60, 60
            [7200, '1 hour ago', '1 hour from now'], // 60*60*2
            [86400, 'hours', 3600], // 60*60*24, 60*60
            [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
            [604800, 'days', 86400], // 60*60*24*7, 60*60*24
            [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
            [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
            [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
            [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
            [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
            [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
            [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
            [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
        ];
        let seconds = (+new Date() - time) / 1000,
            token = 'ago',
            list_choice = 1;

        if (seconds === 0) {
            return 'Just now'
        }
        if (seconds < 0) {
            seconds = Math.abs(seconds);
            token = 'from now';
            list_choice = 2;
        }
        let i = 0;
        let format;
        while (format = time_formats[i++]) {
            if (seconds < format[0]) {
                if (typeof format[2] === 'string')
                    return format[list_choice];
                else
                    return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
            }
        }
        return time;
    }

    _sendMessage(messageText) {
        const {user, groupId} = this.props;

        let message = {
            message: messageText,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            senderUid: user.firebaseUserId
        };

        let displayMessage = {
            message: messageText,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            avatarURL: user.avatar
        };

        this.textInput.clear();
        firebase.database().ref('gamePortal/groups/' + groupId + '/messages').push(message);
    }

    render() {
        const {groupName, messages, switchScreen, loading} = this.props;

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

                <ScrollView
                    ref={ref => this.scrollView = ref}
                    styles={styles.chatRoom}
                    onContentSizeChange={(contentWidth, contentHeight)=>{
                    this.scrollView.scrollToEnd({animated: true});}}
                >
                    <List style={styles.chatMessages}>
                        {
                            messages.map((msg, index) => (

                                <ListItem
                                    roundAvatar
                                    avatar={{uri: msg.avatarURL}}
                                    key={index}
                                    title={msg.message}
                                    subtitle={
                                        msg.timestamp instanceof Object ? "SENDING" : ChatComponent.timeAgo(msg.timestamp)}
                                    hideChevron={true}
                                />
                            ))
                        }
                    </List>
                </ScrollView>

                <TextInput
                    ref={input => {
                        this.textInput = input
                    }}
                    onChangeText={text => newMessage = text}
                    onSubmitEditing={() => this._sendMessage(newMessage)}
                    placeholder="Say something..."
                    style={styles.textInput}
                />

            </View>

        );
    }
}