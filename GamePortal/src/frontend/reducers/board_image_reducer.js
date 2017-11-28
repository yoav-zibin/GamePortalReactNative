import { initialState } from '../store/initial_state';

export const boardImageReducer = (state = initialState.boardImage, action) => {
    switch (action.type) {
        case 'SET_BOARD_IMAGE_URL':
            return Object.assign({}, state, {
                url: action.imageURL
            });
        default:
            return state;
    }
};