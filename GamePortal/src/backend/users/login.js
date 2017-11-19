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

    if (loginObject.credentialType === 'anonymous') {

        return new Promise((resolve, reject) => {

            firebase.auth().signInAnonymously().then(firebaseUser => { //Firebase accepted anonymous login

                firebaseUser.updateProfile({ //set the username
                    displayName: loginObject.credential
                }).then(() => {

                    let userData = {
                        'credentialType': "anonymous",
                        'accessToken': "",
                        'username': loginObject.credential,
                        'avatarURL': "https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png",
                        'firebaseUserId': firebaseUser.uid
                    };

                    AsyncStorage.setItem('userData', JSON.stringify(userData));
                    saveUserObject(firebaseUser).then(firebaseUser => resolve(firebaseUser)).catch(error => reject(error));
                });
            }).catch(error => reject(error));
        });

    } else {

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
                saveUserObject(firebaseUser).then(firebaseUser => resolve(firebaseUser)).catch(error => reject(error));

            }).catch(err => reject(err));
        });

    }
}

export function saveUserObject(firebaseUser) {
    let userId = firebaseUser.uid;

    return new Promise((resolve, reject) => {

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
            avatarImageUrl: firebaseUser.photoURL ? firebaseUser.photoURL : "https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png",
            displayName: firebaseUser.displayName ? firebaseUser.displayName : "",
            isConnected: true,
            lastSeen: firebase.database.ServerValue.TIMESTAMP
        }
    };
}

export { firebaseLoginFlow, firebaseConnect };