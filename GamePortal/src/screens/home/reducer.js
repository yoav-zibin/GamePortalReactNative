import {initialState} from "../../store";

export const HomeReducer = (homeState = initialState.home, action) => {
    switch (action.type) {
        case 'SWITCH_TAB':
            return Object.assign({}, homeState, {
                tab: action.tab
            });
        default:
            return homeState;
    }
};