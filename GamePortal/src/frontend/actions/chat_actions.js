/*
Handle actions related to chat room
 */

import * as firebase from 'firebase';

// Create a new group
export function addMyGroups(group) {
    return {
        type: 'ADD_GROUPS',
        group: group
    }
}

// Start fetching messages, set isFetching flag
export const startFetchingMessages = () => ({
    type: 'START_FETCHING_MESSAGES'
});

// Reset my groups
export function resetMyGroups() {
    return {
        type: 'RESET_MY_GROUPS',
    }
}

// Add a message
export function addMessages(msg) {
    return {
        type: 'ADD_MESSAGES',
        message: msg
    }
}

// Reset group messages
export function resetMessages() {
    return {
        type: 'RESET_MESSAGES'
    }
}

// Get messages from firebase
export const getMessages = (messages) => {
    return function (dispatch) {
        Object.values(messages).forEach(msg => dispatch(addMessages(msg)));

        dispatch(receivedMessages());
    }
}

// Receive all messages
export const receivedAllMessages = () => ({
    type: 'RECEIVED_ALL_MESSAGES',
    receivedAt: Date.now()
});

// (Didn't finish it) Async actions creator to fetch messages from firebase
export function fetchMessages(groupId) {
    return function (dispatch) {
        dispatch(startFetchingMessages());

        firebase.database().ref('gamePortal/groups' + groupId).child('messages').on('value', (snapshot) => {
            // gets around Redux panicking about actions in reducers
            setTimeout(() => {
                const messages = snapshot.val() || [];
                console.log(messages);
                dispatch(getMessages(messages))
            }, 0);
        });
    }
}

// Set message content

export function setMessage(message) {
    return {
        type: 'SET_MESSAGE',
        message: message
    }
}

// Send a message
export function sendMessage(msgInfo) {
    return function (dispatch) {
        let msg = {
                message: msgInfo.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                senderUid: msgInfo.senderId
            };

        let groupId = msgInfo.groupId;

        messagesRef = firebase.database().ref('gamePortal/groups/' + groupId).child('messages');
        messagesRef.push(msg);

        dispatch(addMessages(msg));
    };
};



