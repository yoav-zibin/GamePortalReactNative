import { connect } from 'react-redux';
import {setLoading, switchScreen} from "../../shared/screen/actions";
import GameRendererComponent from "./component";
import {
    addElement, addImageToElement, addPiece, reset, rollDicePiece, setBoardDimensions, setBoardImage, setPieceLocation,
    setPieceState, setPieceVisibility,
    setScale, setSelectedPiece, togglePiece
} from "./actions";

const mapStateToProps = state => ({
    groupId: state.chatRoom.groupId,
    loading: state.screen.loading,
    boardImage: state.gameRenderer.boardImage,
    pieces: state.gameRenderer.pieces,
    elements: state.gameRenderer.elements,
    pieceStates: state.gameRenderer.pieceStates,
    selectedPieceIndex: state.gameRenderer.selectedPieceIndex,
    scaleHeight: state.gameRenderer.scaleHeight,
    scaleWidth: state.gameRenderer.scaleWidth,
    gameSpecs: state.gameCenter.gameSpecs,
    matches: state.gameCenter.matches,
    gameSpecId: state.gameRenderer.gameSpecId,
    matchId: state.gameRenderer.matchId,
    user: state.user,
    groups: state.groups,
    groupId: state.chatRoom.groupId
});

const mapDispatchToProps = dispatch => ({
    switchScreen: screen => dispatch(switchScreen(screen)),
    setBoardImage: (imageURL, height, width) => dispatch(setBoardImage(imageURL, height, width)),
    addPiece: (pieceIndex, pieceObject) => dispatch(addPiece(pieceIndex, pieceObject)),
    setScale: (scaleHeight, scaleWidth) => dispatch(setScale(scaleHeight, scaleWidth)),
    setBoardDimensions: (height, width) => dispatch(setBoardDimensions(height, width)),
    addElement: (elementId, elementObject) => dispatch(addElement(elementId, elementObject)),
    addImageToElement: (elementId, imageIndex, imageURL) => dispatch(addImageToElement(elementId, imageIndex, imageURL)),
    setPieceState: (pieceIndex, newState) => dispatch(setPieceState(pieceIndex, newState)),
    setPieceLocation: (pieceIndex, x, y, newZ) => dispatch(setPieceLocation(pieceIndex, x, y, newZ)),
    setSelectedPiece: (pieceIndex) => dispatch(setSelectedPiece(pieceIndex)),
    togglePiece: (pieceIndex, numberOfImages) => dispatch(togglePiece(pieceIndex, numberOfImages)),
    rollDicePiece: (pieceIndex, numberOfImages) => dispatch(rollDicePiece(pieceIndex, numberOfImages)),
    reset: () => dispatch(reset()),
    setLoading: loading => dispatch(setLoading(loading)),
    setPieceVisibility: (pieceIndex, pieceVisibility) => dispatch(setPieceVisibility(pieceIndex, pieceVisibility))
});

export const GameRendererContainer = connect(mapStateToProps, mapDispatchToProps)(GameRendererComponent);