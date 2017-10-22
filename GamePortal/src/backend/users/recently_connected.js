import * as firebase from 'firebase';


function getRecentlyConnected(userId, callback) {
    firebase.database().ref('gamePortal/recentlyConnected').once('value').then(recentlyConnectedUsers => {


        let jsonString = JSON.stringify(recentlyConnectedUsers);
        let rcuParsed = JSON.parse(jsonString);

        for (let key in rcuParsed) {
            if (rcuParsed.hasOwnProperty(key)) {
                let otherUser = rcuParsed[key];

                if (otherUser.userId !== userId) {

                    firebase.database().ref('users/' + otherUser.userId).once('value').then(userProfile => {
                        callback(userProfile);
                    }).catch(error => alert(error));
                }

            }
        }

    }).catch(error => alert(error));
}

export { getRecentlyConnected };