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

    createGroup: {
        users: []
    },

    chatRoom: {
        groupId: undefined,
        groupName: undefined
    },

    groups: [],

    messages: [],

    gameSpecs: [],

    gameCenter: {
        currentGameId: undefined,
        currentGameName: undefined,
        boardImageId: undefined,
    },

    matches: [],

    boardImage: {
        url: undefined,
        dragState: undefined
    },

    pieces: [],

    piecesInfo: []
};