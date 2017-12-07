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
        matchId: undefined,
        scaleHeight: 0.0,
        scaleWidth: 0.0
    },

    matches: [],

    boardImage: {
        url: undefined,
        dragState: undefined,
        imageWidth: undefined,
        imageHeight: undefined,
        boardHeight: 0,
        boardWidth: 0
    },

    elements: {},
    pieces: {},
    pieceStates: {},
    selectedPieceIndex: -1
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
