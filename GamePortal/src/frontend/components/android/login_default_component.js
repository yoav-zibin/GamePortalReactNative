import React, { Component } from 'react';

import {
    AsyncStorage, Button, Image, Text, TouchableOpacity, View
} from 'react-native';

import {
    AccessToken, LoginManager
} from 'react-native-fbsdk'

import { GoogleSignin } from 'react-native-google-signin';

import styles from '../../styles/common_style'
import { firebaseLoginFlow, firebaseConnect } from '../../../backend/users/login'

import * as firebase from 'firebase';

export default class LoginDefaultComponent extends Component {


    constructor(props) {
        super();
    }

    _finishLogin(success, payload) {
        const { setLoggedInUser, setLoggedOut, switchScreen } = this.props; //actions

        if (success) {
            setLoggedInUser(payload.displayName, payload.photoURL, payload.uid);
            switchScreen('Home');
        } else {
            alert(payload);
            setLoggedOut();
        }
    }

    _login(success, credentialType, credential, accessToken, message) {
        if (success) {
            let loginObject = {
                credential: credential,
                credentialType: credentialType,
                accessToken: accessToken
            };

            firebaseLoginFlow(loginObject).then(firebaseUser => {
                firebaseConnect(firebaseUser.uid);
                this._finishLogin(true, firebaseUser);
            });
        } else {
            this._finishLogin(false, message);
        }
    }

    _facebookLogin() {


        const { setLoggingIn } = this.props;
        setLoggingIn();

        LoginManager.logInWithReadPermissions(['public_profile']).then((fbResult) => { // Facebook accepted login
            if (!fbResult.isCancelled) { // User accepted login

                AccessToken.getCurrentAccessToken().then((accessToken) => {

                    let credential = firebase.auth.FacebookAuthProvider.credential(accessToken.accessToken);
                    this._login(true, "facebook", credential, accessToken.accessToken);
                }).catch((err) => { // Error retrieving access token
                    this._login(false, "facebook", undefined, undefined, err);
                })
            } else { // User rejected login
                this._login(false, "facebook", undefined, undefined, 'User rejected');
            }
        }).catch(err => {
            this._login(false, "facebook", undefined, undefined, err);
        });
    }

    _googleLogin() {

        const { setLoggingIn } = this.props;
        setLoggingIn();

        GoogleSignin.configure({
            webClientId: '144595629077-j8rps88v9isa1uthrac2ll2fnd367143.apps.googleusercontent.com'
        }).then(() => {
            GoogleSignin.signIn().then((googleResult) => { // Google accepted login
                let credential = firebase.auth.GoogleAuthProvider.credential(googleResult.idToken);
                this._login(true, "google", credential, googleResult.idToken);
            }).catch((err) => { // Google rejected login
                this._login(false, "google", undefined, undefined, err);
            })
        }).catch((err) => { // Google rejected configuration
            this._login(false, "google", undefined, undefined, err);
        });
    }

     static _selectRandomUsername() {
        let prefix = ['Fat', 'Skinny', 'Fast', 'Slow', 'Stinky', 'Naked', 'Obese', 'Flatulent', 'Sick', 'Nasty',
            'Smelly', 'Rotund', 'Poor', 'Rich', 'Messy', 'Shy', 'Braggadocios'];

        let suffix = ['Dog', 'Cat', 'Llama', 'Fish', 'Lizard', 'Snake', 'Hamster', 'Gerbil', 'Rabbit', 'Rat', 'Mouse',
            'Fox', 'Hedgehog', 'Pig', 'Cow', 'Horse', 'Sheep', 'Chicken', 'Turkey', 'Rooster'];

        return prefix[Math.floor(Math.random()*prefix.length)] + suffix[Math.floor(Math.random()*suffix.length)];
    }

    _anonymousLogin() {

        const { setLoggingIn, switchScreen, setLoggedInUser } = this.props;
        setLoggingIn();

        this._login(true, "anonymous", LoginDefaultComponent._selectRandomUsername(), null)
    }

    _playAsSomeoneElse() {

        console.ignoredYellowBox = ['Setting a timer'];

        const { setLoading, setLoggedOut, userId } = this.props; //actions
        setLoading(true);

        firebase.database().ref('/users/' + userId + '/publicFields').once('value').then(response => {
            let rJSON = JSON.stringify(response);
            let r = JSON.parse(rJSON);

            r['isConnected'] = false;
            r['lastSeen'] = firebase.database.ServerValue.TIMESTAMP;

            firebase.database().ref('/users/' + userId + '/publicFields').set(r).then(() => {
                firebase.auth().signOut().catch(error => alert(error));
            }).catch(error => alert(error));
        }).catch(error => alert(error));

        AsyncStorage.removeItem('userData').then(() => { //Delete user from our storage
            setLoggedOut();
            setLoading(false);
        });
    }

    render() {

        const { loggingIn, loggedIn, username } = this.props; //state
        const { switchScreen } = this.props; //actions

        if (loggedIn) {
            let continueMessage = "Continue as " + username;

            return (
                <View style={styles.container}>
                    <Text style={styles.header}>
                        Logged In
                        {'\n'}
                    </Text>

                    <Text>
                        You are currently logged in as {username}.
                        {'\n\n'}
                    </Text>

                    <Button
                        onPress={() => switchScreen('Home')}
                        title={continueMessage}
                    />

                    <Text>
                        {'\n'}
                    </Text>

                    <Button
                        onPress = {() => this._playAsSomeoneElse()}
                        title="Play as Someone Else"
                        color="#841584"
                    />
                </View>
            );
        }

        if (loggingIn) {
            return (
                <View style={styles.container}>
                    <Text style={styles.header}>
                        Logging In
                    </Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    GamePortal
                    {'\n\n'}
                </Text>


                <TouchableOpacity onPress={() => this._facebookLogin()}>
                    <Image
                        style={styles.loginButton}
                        source={require('../../img/login_buttons/facebook.png')}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this._googleLogin()}>
                    <Image
                        syle={styles.loginButton}
                        source={require('../../img/login_buttons/google.png')}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => switchScreen('LoginEmail')}>
                    <Image
                        style={styles.loginButton}
                        source={require('../../img/login_buttons/email.png')}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this._anonymousLogin()}>
                    <Image
                        style={styles.loginButton}
                        source={require('../../img/login_buttons/anonymous.png')}
                    />
                </TouchableOpacity>

            </View>
        );
    }
}