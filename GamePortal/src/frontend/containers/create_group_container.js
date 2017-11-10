import { connect } from 'react-redux';
import CreateGroupComponent from "../components/create_group_component";
import {addGroup, setCreateGroupUsers} from "../actions/group_actions";
import {addMessage, switchChatRoom} from "../actions/chat_room_actions";
import {switchScreen} from "../actions/screen_actions";
import {switchSelectUser} from "../actions/recently_connected_actions";



const mapStateToProps = state => ({
    createGroupUsers: state.createGroup.users,
    recentlyConnectedUsers: state.recentlyConnected.users
});

const mapDispatchToProps = dispatch => ({
    addGroup: group => dispatch(addGroup(group)),
    addMessage: (message) => dispatch(addMessage(message)),
    switchScreen: screen => dispatch(switchScreen(screen)),
    switchChatRoom: group => dispatch(switchChatRoom(group)),
    setCreateGroupUsers: users => dispatch(setCreateGroupUsers(users)),
    switchSelectUser: userId => dispatch(switchSelectUser(userId)),
});

export const CreateGroupContainer = connect(mapStateToProps, mapDispatchToProps)(CreateGroupComponent);