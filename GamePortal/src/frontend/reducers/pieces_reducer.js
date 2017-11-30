import { initialState } from '../store/initial_state';

export const piecesReducer = (state = initialState.pieces, action) => {
    switch (action.type) {
        case 'ADD_PIECE':
            let newPiece = action.piece;
            let pieceList = Object.assign([], state);
            for (let i = 0; i < pieceList.length; i++) {
                if (pieceList[i] === newPiece) {
                    return pieceList;
                } 
            }
            pieceList.push(newPiece);
            return pieceList;
        default:
            return state;
    }
};