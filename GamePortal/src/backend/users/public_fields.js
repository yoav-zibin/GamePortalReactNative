import * as firebase from 'firebase';

function getPublicFields(userId) {
    return new Promise((resolve, reject) => {
        firebase.database().ref('users/' + userId + "/publicFields").once('value').then(value => {
            let publicFields = value.val();
            
            resolve(publicFields);
        }).catch(error => reject(error));
    });
}

export { getPublicFields };