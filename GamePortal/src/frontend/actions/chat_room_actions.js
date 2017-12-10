
import * as firebase from 'firebase';


// Add a message
export function addMessage(message) {
    return {
        type: 'ADD_MESSAGE',
        message: message
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
};


// Send a message
export function sendMessage(messageInformation) {

    return function (dispatch) {
        let message = {
                message: messageInformation.value,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                senderUid: messageInformation.senderId
            };

        let groupId = messageInformation.groupId;

        let messagesRef = firebase.database().ref('gamePortal/groups/' + groupId).child('messages');
        messagesRef.push(message);

        dispatch(addMessage(message));
    };
}



