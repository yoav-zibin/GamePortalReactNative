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

    console.log("1");

    if (loginObject.credentialType === 'anonymous') {

        console.log("2");

        return new Promise((resolve, reject) => {

            console.log("3");

            firebase.auth().signInAnonymously().then(firebaseUser => { //Firebase accepted anonymous login

                console.log("4");

                firebaseUser.updateProfile({ //set the username
                    displayName: loginObject.credential
                }).then(() => {

                    console.log("5");

                    let userData = {
                        'credentialType': "anonymous",
                        'accessToken': "",
                        'username': loginObject.credential,
                        'avatarURL': "https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png",
                        'firebaseUserId': firebaseUser.uid
                    };

                    AsyncStorage.setItem('userData', JSON.stringify(userData));
                    saveUserObject(firebaseUser).then(firebaseUser => resolve(firebaseUser)).catch(error => reject(error));

                    console.log("6");

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

        console.log("A");

        firebase.database().ref('/users/' + userId).once('value').then(value => {
            console.log("B");
            if (JSON.stringify(value) === 'null') { //new user
                let userObject = getUserObject(firebaseUser);

                console.log("C");

                console.log(JSON.stringify(userObject));

                firebase.database().ref('/users/' + userId).set(userObject);

                console.log("D");
            } else { //need to set connected
                console.log("E");

                let vJSON = JSON.stringify(value);
                let v = JSON.parse(vJSON);

                let publicFields = v['publicFields'];
                publicFields['isConnected'] = true;
                publicFields['lastSeen'] = firebase.database.ServerValue.TIMESTAMP;

                firebase.database().ref('/users/' + userId + '/publicFields').set(publicFields).catch(error => alert(error));
                console.log("F");
            }

            resolve(firebaseUser);
        }).catch(error => reject(error));
    });
}

function getUserObject(firebaseUser) {
    console.log("B2");
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