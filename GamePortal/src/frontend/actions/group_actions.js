/*
Group related actions
 */

export function addGroup(group) {
    return {
        type: 'ADD_GROUP',
        group: group
    }
}

export function resetGroups() {
    return {
        type: 'RESET_GROUPS'
    }
}

export function setCreateGroupUsers(users) {
    return {
        type: 'SET_CREATE_GROUP_USERS',
        users: users
    }
}