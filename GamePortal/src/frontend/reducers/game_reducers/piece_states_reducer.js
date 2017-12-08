import { initialState } from '../../store/initial_state';

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
            let newZ = action.newZ;

            let updatedPieceStates = Object.assign({}, state);
            updatedPieceStates[pieceIndex].x = x;
            updatedPieceStates[pieceIndex].y = y;

            if (newZ) {
                let max = 1;
                for (let psi in updatedPieceStates) {
                    if (updatedPieceStates.hasOwnProperty(psi)) {
                        let ps = updatedPieceStates[psi];

                        if (ps.zDepth > max) {
                            max = ps.zDepth;
                        }
                    }
                }

                updatedPieceStates[pieceIndex].zDepth = max + 1;
            }

            return updatedPieceStates;
        }


        case 'TOGGLE_PIECE': {
            let pieceIndex = action.pieceIndex;
            let numberOfImages = action.numberOfImages;

            let updatedPieceStates = Object.assign({}, state);

            if (updatedPieceStates[pieceIndex].currentImageIndex === numberOfImages - 1) {
                updatedPieceStates[pieceIndex].currentImageIndex = 0
            } else {
                updatedPieceStates[pieceIndex].currentImageIndex++;
            }

            return updatedPieceStates;
        }


        default:
            return state;
    }
};