import { connect } from 'react-redux';
import { switchScreen } from "../actions/screen_actions";
import {
    setBoardImage, addPiece, setScale, addElement, addImageToElement, setPieceState,
    setBoardDimensions
} from '../actions/game_actions';

import GameCenterComponent from '../components/game_center_component';

const mapStateToProps = state => ({
    groupId: state.chatRoom.groupId,
    loading: state.screen.loading,
    currentGameId: state.gameCenter.currentGameId,
    currentGameName: state.gameCenter.currentGameName,
    matchId: state.gameCenter.matchId,
    boardImageId: state.gameCenter.boardImageId,
    boardImage: state.boardImage,
    pieces: state.pieces,
    elements: state.elements,
    pieceStates: state.pieceStates,

    boardHeight: state.boardImage.boardHeight,
    boardWidth: state.boardImage.boardWidth,
    scale: {
        height: state.gameCenter.scaleHeight,
        width: state.gameCenter.scaleWidth
    }
});

const mapDispatchToProps = dispatch => ({
    switchScreen: screen => dispatch(switchScreen(screen)),
    setBoardImage: (imageURL, height, width) => dispatch(setBoardImage(imageURL, height, width)),
    addPiece: (pieceIndex, pieceObject) => dispatch(addPiece(pieceIndex, pieceObject)),
    setScale: (scaleHeight, scaleWidth) => dispatch(setScale(scaleHeight, scaleWidth)),
    setBoardDimensions: (height, width) => dispatch(setBoardDimensions(height, width)),
    addElement: (elementId, elementObject) => dispatch(addElement(elementId, elementObject)),
    addImageToElement: (elementId, imageIndex, imageURL) => dispatch(addImageToElement(elementId, imageIndex, imageURL)),
    setPieceState: (pieceIndex, lastUpdatedOn, newState) => dispatch(setPieceState(pieceIndex, lastUpdatedOn, newState))
});

export const GameCenterContainer = connect(mapStateToProps, mapDispatchToProps)(GameCenterComponent);