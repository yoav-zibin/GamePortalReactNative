import { connect } from 'react-redux';
import GameCenterComponent from "./component";
import {setGameSpecs, setMatches, switchTab} from "./actions";
import {setLoading, switchScreen} from "../../shared/screen/actions";

const mapStateToProps = state => ({
    tab: state.gameCenter.tab,
    groupId: state.chatRoom.groupId
});

const mapDispatchToProps = dispatch => ({
    switchScreen: screen => dispatch(switchScreen(screen)),
    switchTab: tab => dispatch(switchTab(tab)),
    setGameSpecs: gameSpecs => dispatch(setGameSpecs(gameSpecs)),
    setMatches: matches => dispatch(setMatches(matches)),
    setLoading: loading => dispatch(setLoading(loading))
});

export const GameCenterContainer = connect(mapStateToProps, mapDispatchToProps)(GameCenterComponent);