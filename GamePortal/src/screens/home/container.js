import { connect } from 'react-redux';
import {setLoading, switchScreen} from "../../shared/screen/actions";
import {setLoggedOut} from "../../shared/user/actions";
import HomeComponent from "./component";
import {switchTab} from "./actions";


const mapStateToProps = state => ({
    username: state.user.username,
    avatarURL: state.user.avatarURL,
    loading: state.screen.loading,
    tab: state.home.tab,
    userId: state.user.firebaseUserId
});

const mapDispatchToProps = dispatch => ({
    switchScreen: screen => dispatch(switchScreen(screen)),
    switchTab: tab => dispatch(switchTab(tab)),
    setLoading: loading => dispatch(setLoading(loading)),
    setLoggedOut: () => dispatch(setLoggedOut()),
});

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);