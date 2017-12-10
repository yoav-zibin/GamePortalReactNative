export function switchChatRoom(group) {
    return {
        type: 'SWITCH_ROOM',
        groupId: group.groupId,
        groupName: group.groupName
    }
}