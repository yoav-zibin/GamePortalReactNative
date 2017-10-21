import { initialState } from '../store/initial_state'

export const homeReducer = (state = initialState.home, action) => {
    switch (action.type) {
        case 'SWITCH_TAB':
            return Object.assign({}, state, {
                tab: action.tab
            });
        default:
            return state;
    }
};