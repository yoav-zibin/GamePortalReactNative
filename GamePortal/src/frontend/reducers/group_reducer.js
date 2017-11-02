import { initialState } from '../store/initial_state'

export const groupReducer = (state = initialState.groups, action) => {
    switch (action.type) {
        case 'RESET_GROUPS':
            return [];
        case 'ADD_GROUP':
            let updatedGroupList = Object.assign([], state);
            updatedGroupList.push(action.group);
            return updatedGroupList;
        default:
            return state;
    }
};