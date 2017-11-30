import { initialState } from '../store/initial_state';

export const boardImageReducer = (state = initialState.boardImage, action) => {
    switch (action.type) {
        case 'SET_BOARD_IMAGE':
            return Object.assign({}, state, {
                url: action.imageURL,
                imageWidth: action.width,
                imageHeight: action.height
            });



        case 'SET_BOARD_DIMENSIONS': {
            return Object.assign({}, state, {
                boardWidth: action.width,
                boardHeight: action.height
            })
        }
        default:
            return state;
    }
};