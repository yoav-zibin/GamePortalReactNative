import { initialState } from '../../store/initial_state';

export const piecesReducer = (state = initialState.pieces, action) => {
    switch (action.type) {

        case 'RESET_PIECES' : {
            return {};
        }


        case 'ADD_PIECE': {
            let pieceIndex = action.index;
            let piece = action.piece;

            if (state.hasOwnProperty(pieceIndex)) {
                return state;
            }

            let updatedPieces = Object.assign({}, state);
            updatedPieces[pieceIndex] = piece;
            return updatedPieces;
        }

        default:
            return state;
    }
};