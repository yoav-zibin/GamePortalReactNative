import {combineReducers, createStore} from 'redux';

import {GameRendererReducer} from "./screens/game_renderer/reducer";
import {ChatRoomReducer, MessageReducer} from "./screens/chat/reducer";
import {CreateGroupReducer, GroupsReducer} from "./shared/groups/reducer";
import {HomeReducer} from "./screens/home/reducer";
import {RecentlyConnectedReducer} from "./screens/home/active_users_tab/reducer";
import {ScreenReducer} from "./shared/screen/reducer";
import {UserReducer} from "./shared/user/reducer";
import {GameCenterReducer} from "./screens/game_center/reducer";

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

const rootReducer = combineReducers({
    user: UserReducer,
    screen: ScreenReducer,
    home: HomeReducer,
    recentlyConnected: RecentlyConnectedReducer,
    createGroup: CreateGroupReducer,
    groups: GroupsReducer,
    messages: MessageReducer,
    chatRoom: ChatRoomReducer,
    gameCenter: GameCenterReducer,
    gameRenderer: GameRendererReducer
});


export const store = createStore(
    rootReducer,
    initialState,
);
