import { combineReducers } from 'redux'

import { userReducer } from './user_reducer';
import { screenReducer } from './screen_reducer';
import { homeReducer } from "./home_reducer";
import { recentlyConnectedReducer} from "./recently_connected_reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    screen: screenReducer,
    home: homeReducer,
    recentlyConnected: recentlyConnectedReducer
});