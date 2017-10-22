import { initialState } from '../store/initial_state'

export const recentlyConnectedReducer = (state = initialState.recentlyConnected, action) => {
    switch (action.type) {
        case 'SET_USERS':
            return Object.assign({}, state, {
                users: action.users
            });
        default:
            return state;
    }
};