import { initialState } from '../store/initial_state';

const messageInitialState = {
    id: undefined,
    text: undefined,
    time: undefined,
    author: undefined
}

const message = (state = messageInitialState, action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
        case 'SEND_MESSAGE':
        default:
            return state
    }
}

// Create new messages list by old messages
export const chatMessagesReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            if (state.map(m => m.id).includes(action.id)) {
                return state;
            } else {
                return [
                    ...state,
                    {
                        id: action.id,
                        text: action.text,
                        time: action.time,
                        author: action.author
                    }
                ]
            }
        // case 'SEND_MESSAGE':
        //     return [
        //         ...state,
        //         message(undefined, action)
        //     ]
        default:
            return state
    }
};