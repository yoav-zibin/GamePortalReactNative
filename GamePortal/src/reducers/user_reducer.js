import { initialState } from '../store/initial_state'

export const userReducer = (state = initialState.user, action) => {
    switch (action.type) {
        case 'LOGGING_IN':
            return Object.assign({}, state, {
                loggedIn: false,
                loggingIn: true,
                username: undefined,
                avatarURL: undefined
            });
        case 'LOGGED_IN':
            return Object.assign({}, state, {
                loggedIn: true,
                loggingIn: false,
                username: action.username,
                avatarURL: action.avatarURL
            });
        case 'LOGGED_OUT':
            return Object.assign({}, state, {
                loggedIn: false,
                loggingIn: false,
                username: undefined,
                avatarURL: undefined
            });
        default:
            return state;
    }
};