import { connect } from 'react-redux';
import {
    addGameSpecs, switchGame, resetGameSpecs, addPiece, addMatch, resetPieceStates,
    resetPieces, resetElements
} from "../actions/game_actions";
import {setLoading, switchScreen} from "../actions/screen_actions";

import GameSpecComponent from '../components/game_spec_component';

const mapStateToProps = state => ({
    loading: state.screen.loading,
    gameSpecs: state.gameSpecs,
    groupId: state.chatRoom.groupId,
    pieces: state.pieces
});

const mapDispatchToProps = dispatch => ({
    addGameSpecs: (gameSpecs) => dispatch(addGameSpecs(gameSpecs)),
    resetGameSpecs: () => dispatch(resetGameSpecs()),
    resetPieces: () => dispatch(resetPieces()),
    resetPieceStates: () => dispatch(resetPieceStates()),
    resetElements: () => dispatch(resetElements()),
    addPiece: (piece) => dispatch(addPiece(piece)),
    switchScreen: screen => dispatch(switchScreen(screen)),
    switchGame: (gameSpec) => dispatch(switchGame(gameSpec)),
    addMatch: (match) => dispatch(addMatch(match)),
    setLoading: (loading) => dispatch(setLoading(loading))
});

export const GameSpecContainer = connect(mapStateToProps, mapDispatchToProps)(GameSpecComponent);