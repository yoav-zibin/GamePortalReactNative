/*
Group related actions
 */
export function loadCurrentGroup(group) {
    return {
        type: 'LOAD_CURRENT_GROUP',
        group: group
    }
}

// export function addMyCreatedGroups(group) {
//     return {
//         type: 'ADD_CREATED_GROUPS'
//     }
// }