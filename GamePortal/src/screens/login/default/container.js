import { connect } from 'react-redux';
import {switchScreen} from "../../../shared/screen/actions";
import {setLoggedInUser, setLoggedOut, setLoggingIn} from "../../../shared/user/actions";
import IOSLoginDefaultComponent from "./component_ios";
import AndroidLoginDefaultComponent from "./component_android";
import {resetGroups} from "../../../shared/groups/actions";


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
    setLoggingIn: () => dispatch(setLoggingIn()),
    resetGroups: () => dispatch(resetGroups())
});

export const IOSLoginDefaultContainer = connect(mapStateToProps, mapDispatchToProps)(IOSLoginDefaultComponent);
export const AndroidLoginDefaultContainer = connect(mapStateToProps, mapDispatchToProps)(AndroidLoginDefaultComponent);