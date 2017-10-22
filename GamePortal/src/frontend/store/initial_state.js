export const initialState = {
    user: {
        loggedIn: false,
        loggingIn: false,
        username: undefined,
        avatarURL: undefined,
        firebaseUserId: undefined,
    },

    screen: {
        loading: false,
        screen: 'Splash'
    },

    home: {
        tab: 'tabFriends'
    },

    recentlyConnected: {
        users: []
    }
};