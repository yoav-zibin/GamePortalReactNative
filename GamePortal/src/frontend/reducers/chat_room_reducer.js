import { initialState } from '../store/initial_state';

export const chatRoomReducer = (state = initialState.chatRoom, action) => {
    switch (action.type) {
        case 'SWITCH_ROOM':
            return Object.assign({}, state, {
                groupId: action.groupId,
                groupName: action.groupName
            });
        case 'UPDATE_MESSAGES_HEIGHT':
            return Object.assign({}, state, {
                height: action.height
            });
        default:
            return state;
    }
};
