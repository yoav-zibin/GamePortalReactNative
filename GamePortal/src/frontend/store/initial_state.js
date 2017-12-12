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
        tab: 'tabGroups'
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

    gameCenter: {
        tab: 'tabCurrentMatches',
        matches: {},
        gameSpecs: {},
        gameForOngoingMatches: null
    },

    gameRenderer: {
        gameSpecId: null,
        matchId: null,
        boardImage: {
            url: null,
            height: 0,
            width: 0
        },
        scaleHeight: 0.0,
        scaleWidth: 0.0,
        elements: {},
        pieces: {},
        pieceStates: {},
        selectedPieceIndex: -1
    },
};

export const elementObject = {
    width: 0,
    height: 0,
    images: [],
    isDraggable: false,
    isDrawable: false,
    rotatableDegrees: 1,
    elementKind: 'standard'
};

export const piecesObject = {
    deckPieceIndex: -1,
    pieceElementId: undefined
};

export const pieceStateObject = {
    lastUpdatedOn: 0,
    currentImageIndex: 0,
    x: 0,
    y: 0,
    zDepth: 1,
};
