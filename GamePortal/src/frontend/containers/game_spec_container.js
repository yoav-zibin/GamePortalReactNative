import { connect } from 'react-redux';
import { addGameSpec, switchGame, resetGameSpecs, addPiece, addMatch } from "../actions/game_actions";
import { switchScreen } from "../actions/screen_actions";

import GameSpecComponent from '../components/game_spec_component';

const mapStateToProps = state => ({
    loading: state.screen.loading,
    gameSpecs: state.gameSpecs,
    groupId: state.chatRoom.groupId,
    pieces: state.pieces
});

const mapDispatchToProps = dispatch => ({
    addGameSpec: (gameSpec) => dispatch(addGameSpec(gameSpec)),
    resetGameSpecs: () => dispatch(resetGameSpecs()),
    addPiece: (piece) => dispatch(addPiece(piece)),
    switchScreen: screen => dispatch(switchScreen(screen)),
    switchGame: (gameSpec) => dispatch(switchGame(gameSpec)),
    addMatch: (match) => dispatch(addMatch(match))
});

export const GameSpecContainer = connect(mapStateToProps, mapDispatchToProps)(GameSpecComponent);