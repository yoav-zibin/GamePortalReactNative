import { connect } from 'react-redux';
import CurrentMatchesTabComponent from "./component";
import {setGameForOngoingMatches} from "./actions";

const mapStateToProps = state => ({
    gameSpecs: state.gameCenter.gameSpecs,
    matches: state.gameCenter.matches,
    gameForOngoingMatches: state.gameCenter.gameForOngoingMatches
});

const mapDispatchToProps = dispatch => ({
    setGameForOngoingMatches: gameId => dispatch(setGameForOngoingMatches(gameId))
});

export const CurrentMatchesTabContainer = connect(mapStateToProps, mapDispatchToProps)(CurrentMatchesTabComponent);