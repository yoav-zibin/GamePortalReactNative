import { createStore } from 'redux';

import { initialState } from "./initial_state";
import { rootReducer } from '../reducers/root_reducer';

let store = createStore(rootReducer, initialState);
export default store