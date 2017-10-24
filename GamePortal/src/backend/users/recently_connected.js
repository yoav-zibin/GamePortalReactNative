import * as firebase from 'firebase';


function getRecentlyConnected() {
    return new Promise((resolve, reject) => {
       firebase.database().ref('gamePortal/recentlyConnected').once('value').then(recentlyConnectedUsers => {
           let jsonString = JSON.stringify(recentlyConnectedUsers);
           let rcuParsed = JSON.parse(jsonString);
           
           resolve(rcuParsed);
       }).catch(error => reject(error));
    });
}


export { getRecentlyConnected };