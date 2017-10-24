import * as firebase from 'firebase';

function getPublicFields(userId) {
    return new Promise((resolve, reject) => {
        firebase.database().ref('users/' + userId + "/publicFields").once('value').then(value => {
            let pfJSON = JSON.stringify(value);
            let publicFields = JSON.parse(pfJSON);

            resolve(publicFields);
        }).catch(error => reject(error));
    });
}

export { getPublicFields };