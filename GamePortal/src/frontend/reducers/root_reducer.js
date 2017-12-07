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
import { gameCenterReducer } from './game_reducers/game_center_reducer';
import { boardImageReducer } from './game_reducers/board_image_reducer';
import { piecesReducer } from './game_reducers/pieces_reducer';
import { pieceStatesReducer} from './game_reducers/piece_states_reducer';
import { matchesReducer } from './matches_reducer';
import {elementReducer} from "./game_reducers/element_reducer";
import {selectedPieceIndexReducer} from "./game_reducers/selected_piece_reducer";

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
    matches: matchesReducer,
    pieces: piecesReducer,
    elements: elementReducer,
    pieceStates: pieceStatesReducer,
    selectedPieceIndex: selectedPieceIndexReducer
});