import {initialState} from "../../store";

export const ScreenReducer = (screenState = initialState.screen, action) => {
    switch (action.type) {
        case 'LOADING':
            return Object.assign({}, screenState, {
                loading: action.loading
            });
        case 'SWITCH_SCREEN':
            return Object.assign({}, screenState, {
                screen: action.screen
            });
        default:
            return screenState;
    }
};