import {initialState} from "../../store";

export const GameRendererReducer = (gameRendererState = initialState.gameRenderer, action) => {

    switch(action.type) {

        case 'RESET': {
            return Object.assign({}, gameRendererState, {
                boardImage: {
                    url: null,
                    height: 0,
                    width: 0
                },
                scaleHeight: 0.0,
                scaleWidth: 0.0,
                elements: {},
                pieces: {},
                pieceStates: {},
                selectedPieceIndex: -1
            });
        }

        case 'SET_GAME_SPEC_ID': {
            return Object.assign({}, gameRendererState, {
                gameSpecId: action.gameSpecId
            })
        }

        case 'SET_MATCH_ID': {
            return Object.assign({}, gameRendererState, {
                matchId: action.matchId
            })
        }

        case 'SET_BOARD_IMAGE': {
            return Object.assign({}, gameRendererState, {
                boardImage: Object.assign({}, gameRendererState.boardImage, {
                    url: action.imageURL,
                    height: action.height,
                    width: action.width
                })
            });
        }

        case 'ADD_PIECE': {
            let pieceIndex = action.index;
            let piece = action.piece;

            if (gameRendererState.pieces.hasOwnProperty(pieceIndex)) {
                return gameRendererState;
            }

            let updatedPieces = Object.assign({}, gameRendererState.pieces);
            updatedPieces[pieceIndex] = piece;

            return Object.assign({}, gameRendererState, {
                pieces: updatedPieces
            });
        }


        case 'SET_SCALE': {
            return Object.assign({}, gameRendererState, {
               scaleHeight: action.scaleHeight,
               scaleWidth: action.scaleWidth
            });
        }


        case 'ADD_ELEMENT': {
            let elementId = action.id;
            let element = action.element;

            if (gameRendererState.elements.hasOwnProperty(elementId)) {
                return gameRendererState;
            }

            let updatedElements = Object.assign({}, gameRendererState.elements);
            updatedElements[elementId] = element;

            return Object.assign({}, gameRendererState, {
                elements: updatedElements
            });
        }

        case 'ADD_IMAGE_TO_ELEMENT': {

            let elementId = action.elementId;
            let imageIndex = action.index;
            let imageURL = action.url;

            let updatedElements = Object.assign({}, gameRendererState.elements);

            if (updatedElements[elementId].hasOwnProperty(imageIndex)) {
                return gameRendererState;
            }

            updatedElements[elementId].images[imageIndex] = imageURL;

            return Object.assign({}, gameRendererState, {
                elements: updatedElements
            });
        }

        case 'SET_PIECE_STATE': {
            let pieceIndex = action.pieceIndex;
            let newState = action.newState;

            let updatedPieceStates = Object.assign({}, gameRendererState.pieceStates);
            updatedPieceStates[pieceIndex] = newState;

            return Object.assign({}, gameRendererState, {
                pieceStates: updatedPieceStates
            });
        }


        case 'SET_PIECE_LOCATION': {
            let pieceIndex = action.pieceIndex;
            let x = action.x;
            let y = action.y;
            let newZ = action.newZ;

            let updatedPieceStates = Object.assign({}, gameRendererState.pieceStates);
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

            return Object.assign({}, gameRendererState, {
                pieceStates: updatedPieceStates
            });
        }

        case 'SET_PIECE_VISIBILITY': {
            let pieceIndex = action.pieceIndex;
            let pieceVisibility = action.pieceVisibility;

            let updatedPieceStates = Object.assign({}, gameRendererState.pieceStates);
            updatedPieceStates[pieceIndex].cardVisibility = pieceVisibility;

            return Object.assign({}, gameRendererState, {
                pieceStates: updatedPieceStates
            });
        }

        case 'SET_SELECTED_PIECE': {
            return Object.assign({}, gameRendererState, {
                selectedPieceIndex: action.pieceIndex
            });
        }

        case 'TOGGLE_PIECE': {
            let pieceIndex = action.pieceIndex;
            let numberOfImages = action.numberOfImages;

            let updatedPieceStates = Object.assign({}, gameRendererState.pieceStates);

            if (updatedPieceStates[pieceIndex].currentImageIndex === numberOfImages - 1) {
                updatedPieceStates[pieceIndex].currentImageIndex = 0
            } else {
                updatedPieceStates[pieceIndex].currentImageIndex++;
            }

            return Object.assign({}, gameRendererState, {
                pieceStates: updatedPieceStates
            });
        }

        case 'ROLL_DICE_PIECE': {
            let pieceIndex = action.pieceIndex;
            let numberOfImages = action.numberOfImages;

            let updatedPieceStates = Object.assign({}, gameRendererState.pieceStates);

            updatedPieceStates[pieceIndex].currentImageIndex = Math.floor(Math.random() * numberOfImages);

            return Object.assign({}, gameRendererState, {
                pieceStates: updatedPieceStates
            });
        }

        default: {
            return gameRendererState;
        }

    }

};