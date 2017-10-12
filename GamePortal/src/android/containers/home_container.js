import { connect } from 'react-redux';
import { switchScreen, setLoading } from "../../actions/screen_actions";
import { setLoggedOut } from "../../actions/user_actions";

import HomeComponent from '../components/home_component'


const mapStateToProps = state => ({
    username: state.user.username,
    avatarURL: state.user.avatarURL,
    loading: state.screen.loading
});

const mapDispatchToProps = dispatch => ({
    switchScreen: screen => dispatch(switchScreen(screen)),
    setLoading: loading => dispatch(setLoading(loading)),
    setLoggedOut: () => dispatch(setLoggedOut())
});

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);