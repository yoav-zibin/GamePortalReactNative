import { connect } from 'react-redux';
import CurrentMatchesTabComponent from "./component";

const mapStateToProps = state => ({
    gameSpecs: state.gameCenter.gameSpecs,
    matches: state.gameCenter.matches
});

const mapDispatchToProps = dispatch => ({
});

export const CurrentMatchesTabContainer = connect(mapStateToProps, mapDispatchToProps)(CurrentMatchesTabComponent);