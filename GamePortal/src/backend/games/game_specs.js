import * as firebase from 'firebase';

function getGameSpec(specId) {
    return new Promise((resolve, reject) => {
        firebase.database().ref('gameBuilder/gameSpecs/' + specId).once('value').then(value => {
            resolve(value.val());
        }).catch(error => reject(error));
    });
}

export { getGameSpec };