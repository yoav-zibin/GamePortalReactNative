import * as firebase from 'firebase';

function getGroup(firebaseGroupId) {

    return new Promise((resolve, reject) => {
        firebase.database().ref('gamePortal/groups/' + firebaseGroupId).once('value').then(value => {
            let group = value.val()
            resolve(group);
        }).catch(error => reject(error));
    });
}

function getGroupMessages(firebaseGroupId) {
    return new Promise((resolve, reject) => {
        firebase.database().ref('gamePortal/groups/' + firebaseGroupId)
                           .child('messages')
                           .on('value', (snapshot) => {
                            setTimeout(() => {
                                const messages = snapshot.val() || [];
                                resolve(messages);
                            }, 0);
                        });
    });
}

function getMessageObject(messageId, groupId) {

    return new Promise((resolve, reject) => {
        firebase.database().ref('gamePortal/groups/' + groupId + '/messages/' + messageId)
                           .once('value')
                           .then(value => {
            let pfJSON = JSON.stringify(value);
            let message = JSON.parse(pfJSON);
            resolve(message);
        }).catch(error => reject(error));
    });
}

export { getGroup, getGroupMessages, getMessageObject };