import { connect } from 'react-redux';
import {setLoading, switchScreen} from "../../../../shared/screen/actions";
import {setLoggedInUser} from "../../../../shared/user/actions";
import LoginEmailComponent from "./component";


const mapStateToProps = state => ({
    username: state.user.username,
    avatarURL: state.user.avatarURL,
    loading: state.screen.loading
});

const mapDispatchToProps = dispatch => ({
    switchScreen: screen => dispatch(switchScreen(screen)),
    setLoading: loading => dispatch(setLoading(loading)),
    setLoggedInUser: (username, avatarURL, firebaseUserId) => dispatch(setLoggedInUser(username, avatarURL, firebaseUserId))
});

export const LoginEmailContainer = connect(mapStateToProps, mapDispatchToProps)(LoginEmailComponent);