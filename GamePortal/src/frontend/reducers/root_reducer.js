import { combineReducers } from 'redux'

import { userReducer } from './user_reducer';
import { screenReducer } from './screen_reducer';
import { homeReducer } from "./home_reducer";
import { recentlyConnectedReducer } from "./recently_connected_reducer";
import { chatRoomReducer } from './chat_room_reducer';
import { groupReducer } from './group_reducer';
import { messageReducer } from './message_reducer';
import { createGroupReducer } from "./create_group_reducer";
import { gameSpecsReducer } from './game_specs_reducer';
import { gameCenterReducer } from './game_center_reducer';
import { boardImageReducer } from './board_image_reducer';
import { piecesReducer } from './pieces_reducer';
import { piecesInfoReducer } from './pieces_info_reducer';
import { matchesReducer } from './matches_reducer';

export const rootReducer = combineReducers({
    user: userReducer,
    screen: screenReducer,
    home: homeReducer,
    recentlyConnected: recentlyConnectedReducer,
    createGroup: createGroupReducer,
    groups: groupReducer,
    messages: messageReducer,
    chatRoom: chatRoomReducer,
    gameSpecs: gameSpecsReducer,
    gameCenter: gameCenterReducer,
    boardImage: boardImageReducer,
    pieces: piecesReducer,
    piecesInfo: piecesInfoReducer,
    matches: matchesReducer
});