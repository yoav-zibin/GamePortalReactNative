import { connect } from 'react-redux';
import { switchScreen, setLoading } from "../actions/screen_actions";
import { setLoggedOut } from "../actions/user_actions";
import { sendMessage, fetchMessages, addMessages, resetMessages } from '../actions/chat_actions';

import ChatComponent from '../components/chat_component';

const mapStateToProps = state => ({
    chatHeight: state.chatRoom.height,
    user: state.user,
    group: state.group,
    loading: state.screen.loading,
    messages: state.chatRoom.messages
});

const mapDispatchToProps = dispatch => ({
    switchScreen: screen => dispatch(switchScreen(screen)),
    setLoading: loading => dispatch(setLoading(loading)),
    setLoggedOut: () => dispatch(setLoggedOut()),
    sendMessage: (messageInfo) => dispatch(sendMessage(messageInfo)),
    addMessages: (message) => dispatch(addMessages(message)),
    fetchMessages: (groupId) => dispatch(fetchMessages(groupId)),
    resetMessages: () => dispatch(resetMessages()),
    switchScreen: screen => dispatch(switchScreen(screen))
});

export const ChatContainer = connect(mapStateToProps, mapDispatchToProps)(ChatComponent);