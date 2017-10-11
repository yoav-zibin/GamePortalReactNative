import
{ combineReducers }
from 'redux'

import { userReducer } from './user_reducer';
import { screenReducer } from './screen_reducer'

export const rootReducer = combineReducers({
    user: userReducer,
    screen: screenReducer
});