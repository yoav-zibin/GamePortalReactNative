import { initialState } from '../store/initial_state';

export const createGroupReducer = (state = initialState.createGroup, action) => {
    switch (action.type) {
        case 'SET_CREATE_GROUP_USERS':
            return Object.assign({}, state, {
                users: action.users
            });
        default:
            return state;
    }
};