import { connect } from 'react-redux';
import { switchScreen, setLoading } from "../actions/screen_actions";
import { setLoggedOut } from "../actions/user_actions";
import { sendMessage, fetchMessages } from '../actions/chat_room_actions';
import { addMessage, resetMessages } from "../actions/message_actions";

import ChatComponent from '../components/chat_component';

const mapStateToProps = state => ({
    chatHeight: state.chatRoom.height,
    users: state.createGroup.users,
    groupId: state.chatRoom.groupId,
    groupName: state.chatRoom.groupName,
    loading: state.screen.loading,
    messages: state.messages
});

const mapDispatchToProps = dispatch => ({
    switchScreen: screen => dispatch(switchScreen(screen)),
    setLoading: loading => dispatch(setLoading(loading)),
    setLoggedOut: () => dispatch(setLoggedOut()),
    addMessage: (message) => dispatch(addMessage(message)),
    fetchMessages: (groupId) => dispatch(fetchMessages(groupId)),
    resetMessages: () => dispatch(resetMessages()),
});

export const ChatContainer = connect(mapStateToProps, mapDispatchToProps)(ChatComponent);