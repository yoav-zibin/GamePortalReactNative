export function addGroup(group) {
    return {
        type: 'ADD_GROUP',
        group: group
    }
}

export function setCreateGroupUsers(users) {
    return {
        type: 'SET_CREATE_GROUP_USERS',
        users: users
    }
}

export function switchSelectUser(userId) {
    return {
        type: 'SWITCH',
        userId: userId
    }
}