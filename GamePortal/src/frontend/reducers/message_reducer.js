import { initialState } from '../store/initial_state';

// Create new messages list by old messages
export const messageReducer = (state = initialState.messages, action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            let newMessage = action.message;
            let updatedMessageList = Object.assign([], state);

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
            return state
    }
};