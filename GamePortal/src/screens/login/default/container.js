import { connect } from 'react-redux';
import {switchScreen} from "../../../shared/screen/actions";
import {setLoggedInUser, setLoggedOut, setLoggingIn} from "../../../shared/user/actions";
import iOSLoginDefaultComponent from "./component_ios";
import AndroidLoginDefaultComponent from "./component_android";


const mapStateToProps = state => ({
    loggingIn: state.user.loggingIn,
    loggedIn: state.user.loggedIn,
    username: state.user.username,
    userId: state.user.firebaseUserId
});

const mapDispatchToProps = dispatch => ({
    switchScreen: screen => dispatch(switchScreen(screen)),
    setLoggedInUser: (username, avatarURL, firebaseUserId) => dispatch(setLoggedInUser(username, avatarURL, firebaseUserId)),
    setLoggedOut: () => dispatch(setLoggedOut()),
    setLoggingIn: () => dispatch(setLoggingIn())
});

export const iOSLoginDefaultContainer = connect(mapStateToProps, mapDispatchToProps)(iOSLoginDefaultComponent);
export const AndroidLoginDefaultContainer = connect(mapStateToProps, mapDispatchToProps)(AndroidLoginDefaultComponent);