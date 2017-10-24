/*
Handle actions related to chat room
 */

// Start fetching messages, set isFetching flag
export const startFetchingMessages = () => ({
    type: 'START_FETCHING_MESSAGES'
});

// Add a message
export const addMessage = (msg) => ({
    type: 'ADD_MESSAGE',
    ...msg
});

// Get messages from firebase
export const getMessages = (messages) => {
    return function (dispatch) {
        Object.values(messages).forEach(msg => dispatch(addMessage(msg)));

        dispatch(receivedMessages());
    }
}

// Receive all messages
export const receivedAllMessages = () => ({
    type: 'RECEIVED_ALL_MESSAGES',
    receivedAt: Date.now()
});

// Async actions creator to fetch messages from firebase
export const fetchMessages = () => {
    return function (dispatch) {
        dispatch(startFetchingMessages());

        firebase.database().ref('messages').orderByKey().limitToLast(20).on('value', (snapshot) => {
            // gets around Redux panicking about actions in reducers
            setTimeout(() => {
                const messages = snapshot.val() || [];
                dispatch(getMessages(messages))
            }, 0);
        });
    }
}

// Send a message
export const sendMessage = (text, user) => {
    return function (dispatch) {
        let msg = {
                text: text,
                time: Date.now(),
                author: {
                    name: user.name,
                    avatar: user.avatar
                }
            };

        const newMsgRef = firebase.database()
                                  .ref('/gamePortal/groups/groupId${idSuffix}/messages/messageId${idSuffix}')
                                  .push();
        msg.id = newMsgRef.key;
        newMsgRef.set(msg);

        dispatch(addMessage(msg));
    };
};



