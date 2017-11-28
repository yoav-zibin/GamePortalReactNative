import { connect } from 'react-redux';
import { switchScreen } from "../actions/screen_actions";
import { setBoardImageURL } from '../actions/game_actions';

import GameCenterComponent from '../components/game_center_component';

const mapStateToProps = state => ({
    loading: state.screen.loading,
    currentGameId: state.gameCenter.currentGameId,
    currentGameName: state.gameCenter.currentGameName,
    boardImageId: state.gameCenter.boardImageId,
    boardImage: state.boardImage
});

const mapDispatchToProps = dispatch => ({
    switchScreen: screen => dispatch(switchScreen(screen)),
    setBoardImageURL: (imageURL) => dispatch(setBoardImageURL(imageURL))
});

export const GameCenterContainer = connect(mapStateToProps, mapDispatchToProps)(GameCenterComponent);