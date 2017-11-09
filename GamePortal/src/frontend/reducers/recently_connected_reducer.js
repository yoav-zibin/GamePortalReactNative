import { initialState } from '../store/initial_state'

export const recentlyConnectedReducer = (state = initialState.recentlyConnected, action) => {
    switch (action.type) {
        case 'RESET_USERS':
            return Object.assign({}, state, {
               users: []
            });
        case 'ADD_USER':
            let newList = Object.assign([], state.users);

            if (newList.length === 0) {
                newList.unshift(action.user)
            } else {
                for (let i = 0; i < newList.length; i++) {
                    if (action.user.userId === state.users[i].userId) {
                        if (action.user.timestamp === state.users[i].timestamp) {
                            return state;
                        } else {
                            newList.splice(i, 1);
                        }
                    }
                }

                while (newList.length >= 20) {
                    newList.pop();
                }

                for (let i = 0; i < state.users.length; i++) {
                    if (action.user.timestamp > state.users[i].timestamp) {
                        newList.splice(i, 0, action.user);
                        break;
                    }
                }
            }

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