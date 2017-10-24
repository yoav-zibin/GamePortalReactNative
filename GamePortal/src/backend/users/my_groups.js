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

export { getPublicFields };