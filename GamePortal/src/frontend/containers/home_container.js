import { connect } from 'react-redux';
import { switchScreen, setLoading } from "../actions/screen_actions";
import { setLoggedOut } from "../actions/user_actions";
import { switchTab } from "../actions/home_actions";
import { addRecentlyConnectedUser, resetRecentlyConnectedUsers, switchSelectUser } from "../actions/recently_connected_actions";

import HomeComponent from '../components/home_component'
import {addGroup, resetGroups, setCreateGroupUsers} from "../actions/group_actions";
import {switchChatRoom} from "../actions/chat_room_actions";

const mapStateToProps = state => ({
    username: state.user.username,
    avatarURL: state.user.avatarURL,
    loading: state.screen.loading,
    tab: state.home.tab,
    recentlyConnectedUsers: state.recentlyConnected.users,
    groups: state.groups,
    userId: state.user.firebaseUserId
});

const mapDispatchToProps = dispatch => ({
    switchScreen: screen => dispatch(switchScreen(screen)),
    switchTab: tab => dispatch(switchTab(tab)),
    setLoading: loading => dispatch(setLoading(loading)),
    setLoggedOut: () => dispatch(setLoggedOut()),
    addRecentlyConnectedUser: user => dispatch(addRecentlyConnectedUser(user)),
    resetRecentlyConnectedUsers: () => dispatch(resetRecentlyConnectedUsers()),
    switchSelectUser: userId => dispatch(switchSelectUser(userId)),
    addGroup: group => dispatch(addGroup(group)),
    resetGroups: () => dispatch(resetGroups()),
    switchChatRoom: groupId => dispatch(switchChatRoom(groupId)),
    setCreateGroupUsers: users => dispatch(setCreateGroupUsers(users))
});

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);