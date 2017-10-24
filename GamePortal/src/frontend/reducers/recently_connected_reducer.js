import { initialState } from '../store/initial_state'

export const recentlyConnectedReducer = (state = initialState.recentlyConnected, action) => {
    switch (action.type) {
        case 'RESET_USERS':
            return Object.assign({}, state, {
               users: []
            });
        case 'ADD_USER':
            for (let i = 0; i < state.users.length; i++) {
                if (action.user.userId === state.users[i]) {
                    return state;
                }
            }

            let newList = Object.assign([], state.users);

            while (newList.length >= 20) {
                newList.pop();
            }

            newList.unshift(action.user);

            return Object.assign({}, state, {
                users: newList
            });
        case 'SWITCH':
            let users = Object.assign([], state.users);

            for (let i = 0; i < users.length; i++) {
                if (users[i].userId === action.userId) {
                    users[i].selected = !users[i].selected;
                    break;
                }
            }

            return Object.assign({}, state, {
                users: users
            });
        default:
            return state;
    }
};