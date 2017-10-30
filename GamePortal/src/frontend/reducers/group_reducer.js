import { initialState } from '../store/initial_state'

export const groupReducer = (state = initialState.group, action) => {
    switch (action.type) {
        case 'LOAD_CURRENT_GROUP':
            return Object.assign({}, state, {
                groupId: action.group.groupId,
                groupName: action.group.groupName,
                createdOn: action.group.createdOn,
                participants: action.group.participants,
                messages: action.group.messages,
                matches: action.group.matches
            });
        default:
            return state;
    }
};