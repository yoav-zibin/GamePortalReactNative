import { connect } from 'react-redux';
import { setLoading, switchScreen } from "../actions/screen_actions";
import { setLoggedInUser, setLoggedOut } from "../actions/user_actions";

import SplashComponent from '../components/splash_component'


const mapStateToProps = state => ({
    loading: state.screen.loading,
    loggedIn: state.user.loggedIn,
    username: state.user.username,
    avatarURL: state.user.avatarURL
});

const mapDispatchToProps = dispatch => ({
    setLoading: loading => dispatch(setLoading(loading)),
    switchScreen: screen => dispatch(switchScreen(screen)),
    setLoggedInUser: (username, avatarURL) => dispatch(setLoggedInUser(username, avatarURL)),
    setLoggedOut: () => dispatch(setLoggedOut())
});

export const SplashContainer = connect(mapStateToProps, mapDispatchToProps)(SplashComponent);