import {initialState} from "../../store";

export const UserReducer = (userState = initialState.user, action) => {
    switch (action.type) {
        case 'LOGGING_IN':
            return Object.assign({}, userState, {
                loggedIn: false,
                loggingIn: true,
                username: undefined,
                avatarURL: undefined,
                firebaseUserId: undefined,
            });
        case 'LOGGED_IN':
            return Object.assign({}, userState, {
                loggedIn: true,
                loggingIn: false,
                username: action.username,
                avatarURL: action.avatarURL,
                firebaseUserId: action.firebaseUserId,
            });
        case 'LOGGED_OUT':
            return Object.assign({}, userState, {
                loggedIn: false,
                loggingIn: false,
                username: undefined,
                avatarURL: undefined,
                firebaseUserId: undefined,
            });
        default:
            return userState;
    }
};