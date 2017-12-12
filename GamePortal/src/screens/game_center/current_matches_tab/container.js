import { connect } from 'react-redux';
import CurrentMatchesTabComponent from "./component";
import {setGameForOngoingMatches} from "./actions";
import {setGameSpecId, setMatchId} from "../../game_renderer/actions";
import {switchScreen} from "../../../shared/screen/actions";

const mapStateToProps = state => ({
    gameSpecs: state.gameCenter.gameSpecs,
    matches: state.gameCenter.matches,
    gameForOngoingMatches: state.gameCenter.gameForOngoingMatches
});

const mapDispatchToProps = dispatch => ({
    setGameForOngoingMatches: gameId => dispatch(setGameForOngoingMatches(gameId)),
    setMatchId: matchId => dispatch(setMatchId(matchId)),
    setGameSpecId: gameSpecId => dispatch(setGameSpecId(gameSpecId)),
    switchScreen: screen => dispatch(switchScreen(screen))
});

export const CurrentMatchesTabContainer = connect(mapStateToProps, mapDispatchToProps)(CurrentMatchesTabComponent);