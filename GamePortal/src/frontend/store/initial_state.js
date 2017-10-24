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
        updated: false,
        users: []
    },

    chatMessages: {
        messages: []
    },

    chatRoomMeta: {
        isFetching: false,
        lastFetched: undefined,
        height: 0
    }
};