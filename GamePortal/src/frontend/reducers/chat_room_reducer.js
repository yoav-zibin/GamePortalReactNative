import { initialState } from '../store/initial_state';

export const chatRoomReducer = (state = initialState.chatRoom, action) => {
    switch (action.type) {
        case 'RESET_MESSAGES':
            return Object.assign({}, state, {
                messages: []
            });
        case 'ADD_GROUPS':
            let newList = Object.assign([], state.myGroups);
            for (let i = 0; i < state.myGroups.length; i++) {
                if (action.group.createdOn === state.myGroups[i].createdOn) {
                    return state;
                } 
            }
            newList.push(action.group);
            return Object.assign({}, state, {
                myGroups: newList
            });
        case 'ADD_MESSAGES':
            let newMessageList = Object.assign([], state.messages)
            for (let i = 0; i <  state.messages.length; i++) {
                if (action.message.messageId === state.messages[i].messageId) {
                    return state;
                }
            }
            newMessageList.push(action.message);
            return Object.assign({}, state, {
                messages: newMessageList
            })
        case 'START_FETCHING_MESSAGES':
            return Object.assign({}, state, {
                isFetching: true
            });
        case 'RECEIVED_ALL_MESSAGES':
            return Object.assign({}, state, {
                isFetching: false,
                lastFetched: action.receivedAt
            });
        case 'UPDATE_MESSAGES_HEIGHT':
            return Object.assign({}, state, {
                height: action.height
            });
        default:
            return state
    }
}