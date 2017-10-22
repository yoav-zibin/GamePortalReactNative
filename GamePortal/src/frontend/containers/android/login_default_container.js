import { connect } from 'react-redux';
import { switchScreen } from "../../actions/screen_actions";
import { setLoggedInUser, setLoggedOut, setLoggingIn, } from "../../actions/user_actions";

import LoggingDefaultComponent from '../../components/android/login_default_component'

const mapStateToProps = state => ({
    loggingIn: state.user.loggingIn,
    loggedIn: state.user.loggedIn,
    username: state.user.username,
});

const mapDispatchToProps = dispatch => ({
    switchScreen: screen => dispatch(switchScreen(screen)),
    setLoggedInUser: (username, avatarURL, firebaseUserId) => dispatch(setLoggedInUser(username, avatarURL, firebaseUserId)),
    setLoggedOut: () => dispatch(setLoggedOut()),
    setLoggingIn: () => dispatch(setLoggingIn())
});

export const LoginDefaultContainer = connect(mapStateToProps, mapDispatchToProps)(LoggingDefaultComponent);