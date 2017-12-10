import { connect } from 'react-redux';

import {setLoading, switchScreen} from "../../shared/screen/actions";
import {setLoggedOut} from "../../shared/user/actions";
import ChatComponent from "./component";
import {addMessage, resetMessages} from "./actions";

const mapStateToProps = state => ({
    chatHeight: state.chatRoom.height,
    users: state.createGroup.users,
    groupId: state.chatRoom.groupId,
    groupName: state.chatRoom.groupName,
    loading: state.screen.loading,
    messages: state.messages,
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    switchScreen: screen => dispatch(switchScreen(screen)),
    setLoading: loading => dispatch(setLoading(loading)),
    setLoggedOut: () => dispatch(setLoggedOut()),
    addMessage: (message) => dispatch(addMessage(message)),
    resetMessages: () => dispatch(resetMessages()),
});

export const ChatContainer = connect(mapStateToProps, mapDispatchToProps)(ChatComponent);