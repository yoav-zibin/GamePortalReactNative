import { initialState } from '../store/initial_state';

export const pieceStatesReducer = (state = initialState.pieceStates, action) => {
    switch (action.type) {


        case 'RESET_STATES' : {
            return {};
        }



        case 'SET_PIECE_STATE': {
            let pieceIndex = action.pieceIndex;
            let lastUpdatedOn = action.lastUpdatedOn;
            let newState = action.newState;

            if (state.hasOwnProperty(pieceIndex)) {
                if (state[pieceIndex].lastUpdatedOn >= lastUpdatedOn) {
                    return state;
                }
            }

            let updatedPieceStates = Object.assign({}, state);
            newState.lastUpdatedOn = lastUpdatedOn;
            updatedPieceStates[pieceIndex] = newState;
            return updatedPieceStates;
        }


        case 'SET_PIECE_LOCATION': {
            let pieceIndex = action.pieceIndex;
            let x = action.x;
            let y = action.y;

            let updatedPieceStates = Object.assign({}, state);
            updatedPieceStates[pieceIndex].x = x;
            updatedPieceStates[pieceIndex].y = y;

            return updatedPieceStates;
        }


        default:
            return state;
    }
};