import * as firebase from 'firebase';

function getMyGroups(userId) {
    return new Promise((resolve, reject) => {
        firebase.database().ref('users/' + userId + '/privateButAddable/groups').once('value').then(value => {
            let pfJSON = JSON.stringify(value);
            let myGroups = JSON.parse(pfJSON);

            resolve(myGroups);
        }).catch(error => reject(error));
    });
}

function getGroupObject(firebaseGroupId) {

    return new Promise((resolve, reject) => {
        firebase.database().ref('gamePortal/groups/' + firebaseGroupId).once('value').then(value => {
            let pfJSON = JSON.stringify(value);
            let group = JSON.parse(pfJSON);
            resolve(group);
        }).catch(error => reject(error));
    });
}

function getGroupMessages(firebaseGroupId) {
    return new Promise((resolve, reject) => {
        firebase.database().ref('gamePortal/groups/' + firebaseGroupId)
                           .child('messages').once('value')
                           .then(value => {
            let pfJSON = JSON.stringify(value);
            let messages = JSON.parse(pfJSON);
            console.log(messages);
            resolve(messages);
        }).catch(error => reject(error));
    });
}

function getMessageObject(messageId, groupId) {

    console.log(messageId);
    console.log(groupId);

    return new Promise((resolve, reject) => {
        firebase.database().ref('gamePortal/groups/' + groupId + '/messages/' + messageId)
                           .once('value')
                           .then(value => {
            console.log(value);
            let pfJSON = JSON.stringify(value);
            console.log(pfJSON);
            let message = JSON.parse(pfJSON);
            console.log(message);
            resolve(message);
        }).catch(error => reject(error));
    });
}

export { getMyGroups, getGroupObject, getGroupMessages, getMessageObject };