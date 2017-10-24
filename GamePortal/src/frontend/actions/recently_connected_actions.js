/*
 Sets the recently connected users
 */
export function setRecentlyConnectedUsers(users) {
    return {
        type: 'SET_USERS',
        users: users
    }
}