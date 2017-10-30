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

    group: {
        groupId: undefined,
        groupName: undefined,
        createdOn: undefined,
        participants: [],
        messages: [],
        matches: []
    },

    chatRoom: {
        myGroups: [],
        messages: [],
        isFetching: false,
        lastFetched: undefined,
        height: 0
    },

    message: {
        messageId: undefined,
        message: undefined,
        timestamp: undefined,
        senderUid: undefined
    }
};