/*
 Set the users that have recently connected to the service
 */
export function setUsers(users) {
    return {
        type: 'SET_USERS',
        users: users
    }
}