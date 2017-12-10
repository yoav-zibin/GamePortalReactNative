import { connect } from 'react-redux';
import {switchScreen} from "../../shared/screen/actions";
import {addGroup, setCreateGroupUsers, switchSelectUser} from "../../shared/groups/actions";
import {switchChatRoom} from "../../shared/chats/actions";
import CreateGroupComponent from "./component";

const mapStateToProps = state => ({
    createGroupUsers: state.createGroup.users,
    recentlyConnectedUsers: state.recentlyConnected.users
});

const mapDispatchToProps = dispatch => ({
    addGroup: group => dispatch(addGroup(group)),
    switchScreen: screen => dispatch(switchScreen(screen)),
    switchChatRoom: group => dispatch(switchChatRoom(group)),
    setCreateGroupUsers: users => dispatch(setCreateGroupUsers(users)),
    switchSelectUser: userId => dispatch(switchSelectUser(userId)),
});

export const CreateGroupContainer = connect(mapStateToProps, mapDispatchToProps)(CreateGroupComponent);