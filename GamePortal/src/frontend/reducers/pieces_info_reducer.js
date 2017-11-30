import { initialState } from '../store/initial_state';

export const piecesInfoReducer = (state = initialState.piecesInfo, action) => {
    switch (action.type) {
        case 'ADD_PIECE_INFO':
            let newPieceInfo = action.pieceInfo;
            let pieceInfoList = Object.assign([], state);
            for (let i = 0; i < pieceInfoList.length; i++) {
                if (pieceInfoList[i] === newPieceInfo) {
                    return pieceInfoList;
                } 
            }
            pieceInfoList.push(newPieceInfo);
            return pieceInfoList;
        default:
            return state;
    }
};