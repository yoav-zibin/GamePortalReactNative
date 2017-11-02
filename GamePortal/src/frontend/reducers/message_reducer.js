import { initialState } from '../store/initial_state';

// Create new messages list by old messages
export const messageReducer = (state = initialState.messages, action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            let updatedMessageList = Object.assign([], state);
            updatedMessageList.push(action.message);
            return updatedMessageList;
        case 'RESET_MESSAGES':
            return [];
        default:
            return state
    }
};