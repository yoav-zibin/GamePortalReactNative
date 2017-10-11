import { initialState } from '../store/initial_state'

export const screenReducer = (state = initialState.screen, action) => {
    switch (action.type) {
        case 'LOADING':
            return Object.assign({}, state, {
                loading: action.loading
            });
        case 'SWITCH_SCREEN':
            return Object.assign({}, state, {
                screen: action.screen
            });
        default:
            return state;
    }
};