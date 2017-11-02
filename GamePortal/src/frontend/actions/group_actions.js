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