import React, {Component} from "react";
import styles from "../../resources/styles/common_style";
import {ScrollView, Text, TextInput, View} from "react-native";
import NavigationBar from 'react-native-navbar';
import {List, ListItem} from 'react-native-elements';
import * as firebase from 'firebase';
import {getPublicFields} from "../../util/firebase_public_fields";

export default class ChatComponent extends Component {

    constructor() {
        super();
        this.newMessage = "";
    }

    componentWillMount() {
        const {groupId, addMessage, resetMessages, setLoading} = this.props;
        resetMessages();

        setLoading(true);

        firebase.database().ref('gamePortal/groups/' + groupId + "/messages").on('value', messages => {
            let messagesPublicFields = {};

            messages.forEach(messageRAW => {
                let messageId = messageRAW.key;
                let message = messageRAW.val();

                let userId = message.senderUid;

                if (!messagesPublicFields.hasOwnProperty(userId)) {
                    getPublicFields(userId).then(publicFields => {
                        messagesPublicFields[userId] = {
                            'displayName': publicFields.displayName,
                            'avatarURL': publicFields.avatarImageUrl
                        };

                        addMessage({
                            id: messageId,
                            message: message.message,
                            timestamp: message.timestamp,
                            displayName: publicFields.displayName,
                            avatarURL: publicFields.avatarImageUrl
                        });
                    })
                } else {
                    addMessage({
                        id: messageId,
                        message: message.message,
                        timestamp: message.timestamp,
                        displayName: messagesPublicFields[userId].displayName,
                        avatarURL: messagesPublicFields[userId].avatarURL
                    });
                }
            });

            setLoading(false);
        })

    }

    render() {
        const { loading } = this.props;

        if (loading) {
            return ChatComponent.renderLoading()
        }

        return (
            <View style={styles.container}>
                {this.renderHead()}
                {this.renderBody()}
            </View>
        );
    }

    static renderLoading() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    Loading chat information
                </Text>
            </View>
        );
    }

    renderHead() {
        const { groupName, switchScreen} = this.props;

        return (
            <View style={styles.headerContainer}>
                <NavigationBar
                    title={{title: groupName}}
                    leftButton={{
                        title: 'Game',
                        handler: () => switchScreen('GameCenter')
                    }}
                    rightButton={{
                        title: 'Back',
                        handler: () => switchScreen('Home')
                    }}
                />
            </View>
        );
    }

    renderBody() {
        return (
            <View style={styles.tabbedContainer}>
                {this.renderMessageLog()}
                {this.renderNewMessageEntry()}
            </View>
        );
    }

    renderMessageLog() {
        const { messages } = this.props;

        return (
            <ScrollView
                ref={ref => this.scrollView = ref}
                styles={styles.chatRoom}
                onContentSizeChange={() => {
                    this.scrollView.scrollToEnd({animated: true});}}
            >
                <List style={styles.chatMessages}>
                    {
                        messages.map((message, index) => (

                            <ListItem
                                roundAvatar
                                avatar={{uri: message.avatarURL}}
                                key={index}
                                title={ChatComponent.renderMessage(message)}
                                subtitle={
                                    message.timestamp instanceof Object ? "SENDING" : ChatComponent.timeAgo(message.timestamp)}
                                hideChevron={true}
                            />
                        ))
                    }
                </List>
            </ScrollView>
        );
    }

    static renderMessage(message) {
        return(
          <View>
              <Text style={{fontWeight: 'bold'}}>{'\t' + message.displayName}</Text>
              <Text>{'\t' + message.message}</Text>
          </View>
        );
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

    renderNewMessageEntry() {
        return (
            <TextInput
                ref={input => {
                    this.textInput = input
                }}
                onChangeText={text => {
                    this.newMessage = text
                }}
                onSubmitEditing={() => this.sendMessage()}
                placeholder="Say something..."
                style={styles.textInput}
            />
        );
    }

    sendMessage() {
        const {user, groupId} = this.props;

        let message = {
            message: this.newMessage,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            senderUid: user.firebaseUserId
        };

        this.textInput.clear();
        firebase.database().ref('gamePortal/groups/' + groupId + '/messages').push(message);
    }
}