import { connect } from 'react-redux';
import { switchScreen, setLoading } from "../../actions/screen_actions";
import { setLoggedInUser } from "../../actions/user_actions";

import LoginEmailComponent from '../components/login_email_component'


const mapStateToProps = state => ({
    username: state.user.username,
    avatarURL: state.user.avatarURL,
    loading: state.screen.loading
});

const mapDispatchToProps = dispatch => ({
    switchScreen: screen => dispatch(switchScreen(screen)),
    setLoading: loading => dispatch(setLoading(loading)),
    setLoggedInUser: (username, avatarURL) => dispatch(setLoggedInUser(username, avatarURL))
});

export const LoginEmailContainer = connect(mapStateToProps, mapDispatchToProps)(LoginEmailComponent);