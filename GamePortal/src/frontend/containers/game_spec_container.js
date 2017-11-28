import { connect } from 'react-redux';
import { addGameSpec, switchGame } from "../actions/game_actions";
import { switchScreen } from "../actions/screen_actions";

import GameSpecComponent from '../components/game_spec_component';

const mapStateToProps = state => ({
    loading: state.screen.loading,
    gameSpecs: state.gameSpecs
});

const mapDispatchToProps = dispatch => ({
    addGameSpec: (gameSpec) => dispatch(addGameSpec(gameSpec)),
    switchScreen: screen => dispatch(switchScreen(screen)),
    switchGame: (gameSpec) => dispatch(switchGame(gameSpec))
});

export const GameSpecContainer = connect(mapStateToProps, mapDispatchToProps)(GameSpecComponent);