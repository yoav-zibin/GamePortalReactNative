import { connect } from 'react-redux';
import { switchScreen } from "../actions/screen_actions";
import { setBoardImageURL, addPiece, addPieceInfo } from '../actions/game_actions';

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
    piecesInfo: state.piecesInfo
});

const mapDispatchToProps = dispatch => ({
    switchScreen: screen => dispatch(switchScreen(screen)),
    setBoardImageURL: (imageURL) => dispatch(setBoardImageURL(imageURL)),
    addPiece: (piece) => dispatch(addPiece(piece)),
    addPieceInfo: (pieceInfo) => dispatch(addPieceInfo(pieceInfo))
});

export const GameCenterContainer = connect(mapStateToProps, mapDispatchToProps)(GameCenterComponent);