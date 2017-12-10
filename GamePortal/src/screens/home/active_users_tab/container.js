import { connect } from 'react-redux';
import ActiveUsersTabComponent from "./component";
import {switchScreen} from "../../../shared/screen/actions";
import {addRecentlyConnectedUser} from "./actions";
import {setCreateGroupUsers, switchSelectUser} from "../../../shared/groups/actions";

const mapStateToProps = state => ({
    recentlyConnectedUsers: state.recentlyConnected.users,
});

const mapDispatchToProps = dispatch => ({
    setCreateGroupUsers: users => dispatch(setCreateGroupUsers(users)),
    switchSelectUser: userId => dispatch(switchSelectUser(userId)),
    switchScreen: screen => dispatch(switchScreen(screen)),
    addRecentlyConnectedUser: user => dispatch(addRecentlyConnectedUser(user))
});

export const ActiveUsersTabContainer = connect(mapStateToProps, mapDispatchToProps)(ActiveUsersTabComponent);