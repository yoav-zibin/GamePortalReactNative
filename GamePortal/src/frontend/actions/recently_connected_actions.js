/*
 Add a new recently connected user
 */
export function addRecentlyConnectedUser(user) {
    return {
        type: 'ADD_USER',
        user: user
    }
}

export function resetRecentlyConnectedUsers() {
    return {
        type: 'RESET_USERS'
    }
}

export function switchSelectUser(userId) {
    return {
        type: 'SWITCH',
        userId: userId
    }

}