import {initialState} from "../../../store";

export const RecentlyConnectedReducer = (recentlyConnectedState = initialState.recentlyConnected, action) => {
    switch (action.type) {


        case 'ADD_USER': {
            let newList = Object.assign([], recentlyConnectedState.users);

            if (newList.length === 0) {
                newList.unshift(action.user)
            } else {
                for (let i = 0; i < newList.length; i++) {
                    if (action.user.userId === recentlyConnectedState.users[i].userId) {
                        if (action.user.timestamp === recentlyConnectedState.users[i].timestamp) {
                            return state;
                        } else {
                            newList.splice(i, 1);
                        }
                    }
                }

                while (newList.length >= 20) {
                    newList.pop();
                }

                for (let i = 0; i < recentlyConnectedState.users.length; i++) {
                    if (action.user.timestamp > recentlyConnectedState.users[i].timestamp) {
                        newList.splice(i, 0, action.user);
                        break;
                    }
                }
            }

            return Object.assign({}, recentlyConnectedState, {
                users: newList
            });
        }


        case 'SWITCH': {
            let users = Object.assign([], recentlyConnectedState.users);

            for (let i = 0; i < users.length; i++) {
                if (users[i].userId === action.userId) {
                    users[i].selected = !users[i].selected;
                    break;
                }
            }

            return Object.assign({}, recentlyConnectedState, {
                users: users
            });
        }


        default: {
            return recentlyConnectedState;
        }
    }
};