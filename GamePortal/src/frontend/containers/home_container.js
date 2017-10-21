import { connect } from 'react-redux';
import { switchScreen, setLoading } from "../actions/screen_actions";
import { setLoggedOut } from "../actions/user_actions";
import { switchTab } from "../actions/home_actions";

import HomeComponent from '../components/home_component'


const mapStateToProps = state => ({
    username: state.user.username,
    avatarURL: state.user.avatarURL,
    loading: state.screen.loading,
    tab: state.home.tab
});

const mapDispatchToProps = dispatch => ({
    switchScreen: screen => dispatch(switchScreen(screen)),
    switchTab: tab => dispatch(switchTab(tab)),
    setLoading: loading => dispatch(setLoading(loading)),
    setLoggedOut: () => dispatch(setLoggedOut())
});

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);