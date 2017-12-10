import { connect } from 'react-redux';
import ActiveUsersTabComponent from "./component";
import {switchScreen} from "../../../shared/screen/actions";
import {addGroup} from "../../../shared/groups/actions";
import {switchChatRoom} from "../../../shared/chats/actions";


const mapStateToProps = state => ({
    groups: state.groups
});

const mapDispatchToProps = dispatch => ({
    switchChatRoom: groupId => dispatch(switchChatRoom(groupId)),
    switchScreen: screen => dispatch(switchScreen(screen)),
    addGroup: group => dispatch(addGroup(group))
});

export const GroupsTabContainer = connect(mapStateToProps, mapDispatchToProps)(ActiveUsersTabComponent);