import * as firebase from 'firebase';

function getGameSpec(specId) {
    return new Promise((resolve, reject) => {
        firebase.database().ref('gameBuilder/gameSpecs/' + specId).once('value').then(value => {
            
            let pfJSON = JSON.stringify(value);
            let gameSpecs = JSON.parse(pfJSON);     
            resolve(gameSpecs);
        }).catch(error => reject(error));
    });
}

export { getGameSpec };