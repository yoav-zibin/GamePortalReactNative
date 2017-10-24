import { connect } from 'react-redux';
import { switchScreen, setLoading } from "../actions/screen_actions";
import { setLoggedOut } from "../actions/user_actions";

import ChatComponent from '../components/chat_component'

const mapStateToProps = state => ({
    chatHeight: state.chatRoomMeta.height,
    username: state.user.username,
    loading: state.screen.loading
});

const mapDispatchToProps = dispatch => ({
    switchScreen: screen => dispatch(switchScreen(screen)),
    setLoading: loading => dispatch(setLoading(loading)),
    setLoggedOut: () => dispatch(setLoggedOut())
});

export const ChatContainer = connect(mapStateToProps, mapDispatchToProps)(ChatComponent);