import { connect } from 'react-redux';
import { switchScreen, setLoading } from "../../actions/screen_actions";
import { setLoggedInUser } from "../../actions/user_actions";

import CreateAccountComponent from "../components/create_account_component";

const mapStateToProps = state => ({
    loading: state.screen.loading
});

const mapDispatchToProps = dispatch => ({
    switchScreen: screen => dispatch(switchScreen(screen)),
    setLoading: loading => dispatch(setLoading((loading))),
    setLoggedInUser: (username, avatarURL) => dispatch(setLoggedInUser(username, avatarURL))
});

export const CreateAccountContainer = connect(mapStateToProps, mapDispatchToProps)(CreateAccountComponent);