import { initialState } from '../store/initial_state';

export const chatMetaReducer = (state = initialState.chatRoomMeta, action) => {
    switch (action.type) {
        case 'START_FETCHING_MESSAGES':
            return Object.assign({}, state, {
                isFetching: true
            });
        case 'RECEIVED_ALL_MESSAGES':
            return Object.assign({}, state, {
                isFetching: false,
                lastFetched: action.receivedAt
            });
        case 'UPDATE_MESSAGES_HEIGHT':
            return Object.assign({}, state, {
                height: action.height
            });
        default:
            return state
    }
}