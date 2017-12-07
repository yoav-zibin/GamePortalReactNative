import { initialState } from '../../store/initial_state';

export const selectedPieceIndexReducer = (state = initialState.selectedPieceIndex, action) => {
    switch (action.type) {

        case 'SET_SELECTED_PIECE': {
            return action.pieceIndex;
        }

        default: {
            return state
        }

    }
};