import {initialState} from "../../store";

export const ChatRoomReducer = (chatRoomState = initialState.chatRoom, action) => {
    switch (action.type) {



        case 'SWITCH_ROOM':
            return Object.assign({}, chatRoomState, {
                groupId: action.groupId,
                groupName: action.groupName
            });


        default:
            return chatRoomState;
    }
};


export const MessageReducer = (messageState = initialState.messages, action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            let newMessage = action.message;
            let updatedMessageList = Object.assign([], messageState);

            if (updatedMessageList.length === 0) {
                updatedMessageList.unshift(newMessage);
            } else {
                let ret = false;

                updatedMessageList.forEach(message => {
                    if (message.id === newMessage.id) {
                        ret = true;
                        return updatedMessageList;
                    }
                });

                if (ret) return updatedMessageList;

                let broken = false;

                for (let i = updatedMessageList.length - 1; i >= 0; i--) {
                    if (newMessage.timestamp > updatedMessageList[i].timestamp) {
                        updatedMessageList.splice(i + 1, 0, newMessage);
                        broken = true;
                        break;
                    }
                }

                if (!broken) {
                    updatedMessageList.unshift(newMessage);
                }
            }

            return updatedMessageList;
        case 'RESET_MESSAGES':
            return [];
        default:
            return messageState
    }
};