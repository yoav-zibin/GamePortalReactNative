import { connect } from 'react-redux';
import {setLoading, switchScreen} from "../../../../shared/screen/actions";
import {setLoggedInUser} from "../../../../shared/user/actions";
import CreateAccountComponent from "./component";


const mapStateToProps = state => ({
    loading: state.screen.loading
});

const mapDispatchToProps = dispatch => ({
    switchScreen: screen => dispatch(switchScreen(screen)),
    setLoading: loading => dispatch(setLoading((loading))),
    setLoggedInUser: (username, avatarURL, firebaseUserId) => dispatch(setLoggedInUser(username, avatarURL, firebaseUserId))
});

export const CreateAccountContainer = connect(mapStateToProps, mapDispatchToProps)(CreateAccountComponent);