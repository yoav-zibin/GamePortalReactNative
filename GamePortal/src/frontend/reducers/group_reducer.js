import { initialState } from '../store/initial_state'

export const groupReducer = (state = initialState.groups, action) => {
    switch (action.type) {
        case 'RESET_GROUPS':
            return [];
        case 'ADD_GROUP':

            let updatedGroupList = Object.assign([], state);

            if (action.group.messages === undefined) {
                action.group.messages = {};
            }

            if (updatedGroupList.length === 0) {
                updatedGroupList.unshift(action.group);
            } else {
                for (let i = 0; i < updatedGroupList.length; i++) {
                    let group = updatedGroupList[i];

                    if (group.groupId === action.group.groupId) {
                        if (Object.keys(group.messages).length === Object.keys(action.group.messages).length) {
                            return updatedGroupList;
                        } else {
                            updatedGroupList.splice(i, 0);
                            break;
                        }
                    }
                }

                let added = false;
                for (let i = 0; i < updatedGroupList.length; i++) {
                    let group = updatedGroupList[i];

                    let groupTimestamp = 0;

                    if (Object.keys(group.messages).length === 0) {
                        groupTimestamp = group.createdOn;
                    } else {
                        for (let messageId in group.messages) {
                            if (group.messages.hasOwnProperty(messageId)) {
                                let message = group.messages[messageId];

                                if (message.timestamp > groupTimestamp) {
                                    groupTimestamp = message.timestamp;
                                }
                            }
                        }
                    }

                    let actionTimestamp = 0;

                    if (Object.keys(action.group.messages).length === 0) {
                        actionTimestamp = action.group.createdOn;
                    } else {
                        for (let messageId in action.group.messages) {
                            if (action.group.messages.hasOwnProperty(messageId)) {
                                let message = action.group.messages[messageId];

                                if (message.timestamp > actionTimestamp) {
                                    actionTimestamp = message.timestamp;
                                }
                            }
                        }
                    }

                    if (actionTimestamp > groupTimestamp) {
                        updatedGroupList.splice(i, 0, action.group);
                        added = true;
                        break;
                    }
                }

                if (!added) {
                    updatedGroupList.push(action.group);
                }
            }

            return updatedGroupList;
        default:
            return state;
    }
};