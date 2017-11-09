import { AsyncStorage } from 'react-native';

import * as firebase from 'firebase';

function firebaseConnect(firebaseUserId) {
    firebase.database().ref('gamePortal/recentlyConnected/').push({
        userId: firebaseUserId,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    });
}

function firebaseLoginFlow(loginObject) {
    console.ignoredYellowBox = ['Setting a timer'];

    return new Promise((resolve, reject) => {
        firebase.auth().signInWithCredential(loginObject.credential).then(firebaseUser => {
            //Firebase accepted the login credential

            let userData = {
                'credentialType': loginObject.credentialType,
                'accessToken': loginObject.accessToken,
                'username': firebaseUser.displayName ? firebaseUser.displayName : "",
                'avatarURL': firebaseUser.photoURL ? firebaseUser.photoURL : "",
                'firebaseUserId': firebaseUser.uid
            };

            AsyncStorage.setItem('userData', JSON.stringify(userData));


            let userId = firebaseUser.uid;

            firebase.database().ref('/users/' + userId).once('value').then(value => {
                if (JSON.stringify(value) === 'null') { //new user
                    let userObject = getUserObject(firebaseUser);
                    firebase.database().ref('/users/' + userId).set(userObject);
                } else { //need to set connected
                    let vJSON = JSON.stringify(value);
                    let v = JSON.parse(vJSON);

                    let publicFields = v['publicFields'];
                    publicFields['isConnected'] = true;
                    publicFields['lastSeen'] = firebase.database.ServerValue.TIMESTAMP;

                    firebase.database().ref('/users/' + userId + '/publicFields').set(publicFields).catch(error => alert(error));
                }

                resolve(firebaseUser);
            }).catch(error => reject(error));

        }).catch(err => reject(err));
    });


}

function getUserObject(firebaseUser) {
    return {
        privateFields: {
            email: firebaseUser.email ? firebaseUser.email : "",
            createdOn: firebase.database.ServerValue.TIMESTAMP,
            phoneNumber: firebaseUser.phoneNumber ? firebaseUser.phoneNumber : "",
            facebookId: "",
            githubId: "",
            googleId: "",
            twitterId: "",
            pushNotificationsToken: ""
        },
        publicFields: {
            avatarImageUrl: firebaseUser.photoURL ? firebaseUser.photoURL : "",
            displayName: firebaseUser.displayName ? firebaseUser.displayName : "",
            isConnected: true,
            lastSeen: firebase.database.ServerValue.TIMESTAMP
        }
    };
}

export { firebaseLoginFlow, firebaseConnect };