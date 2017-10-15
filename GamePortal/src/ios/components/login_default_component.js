import React, { Component } from 'react';

import {
    AsyncStorage, Button, Image, Text, TouchableOpacity, View
} from 'react-native';

import {
    AccessToken, LoginManager
} from 'react-native-fbsdk'

// import { GoogleSignin } from 'react-native-google-signin';

import styles from '../../styles/ios_style'

import * as firebase from 'firebase';

export default class LoginDefaultComponent extends Component {


    constructor(props) {
        super(props);
    }

    _login(success, credential_type, credential, token, message) {

        const { setLoggedOut, setLoggedInUser, switchScreen } = this.props; //actions

        if (!success) {
            alert("Login failed, reason: " + message);
            setLoggedOut();
        } else {
            firebase.auth().signInWithCredential(credential).then((firebaseUser) => { //Firebase accepted login

                //Save login details to storage

                let userData = {
                    'credentialType': credential_type,
                    'accessToken': token,
                    'username': firebaseUser.displayName,
                    'avatarURL': firebaseUser.photoURL
                };

                AsyncStorage.setItem('userData', JSON.stringify(userData));

                //Go to the home page

                setLoggedInUser(firebaseUser.displayName, firebaseUser.photoURL);
                switchScreen('Home');

            }, function (err) { //Firebase rejected Facebook login
                console.log(err);
                alert("Login Failed, try another method");
                setLoggedOut();
            })
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
        }, function (err) { //Facebook rejected login
            this._login(false, "facebook", undefined, undefined, err);
        });
    }

    // _googleLogin() {

    //     const { setLoggingIn } = this.props;
    //     setLoggingIn();

    //     GoogleSignin.configure({
    //         webClientId: '144595629077-j8rps88v9isa1uthrac2ll2fnd367143.apps.googleusercontent.com'
    //     }).then(() => {
    //         GoogleSignin.signIn().then((googleResult) => { // Google accepted login
    //             let credential = firebase.auth.GoogleAuthProvider.credential(googleResult.idToken);
    //             this._login(true, "google", credential, googleResult.idToken);
    //         }).catch((err) => { // Google rejected login
    //             this._login(false, "google", undefined, undefined, err);
    //         })
    //     }).catch((err) => { // Google rejected configuration
    //         this._login(false, "google", undefined, undefined, err);
    //     });
    // }

    _anonymousLogin() {

        const { setLoggingIn, switchScreen, setLoggedInUser } = this.props;
        setLoggingIn();

        firebase.auth().signInAnonymously().then(() => {
            setLoggedInUser('Anonymous', JSON.stringify(null));
            switchScreen('Home');
        }).catch((error => {
            alert(error);
        }));
    }

    _playAsSomeoneElse() {

        const { setLoading, setLoggedOut } = this.props; //actions
        setLoading(true);

        firebase.auth().signOut().catch((error) => {
            alert(error) //firebase failed signout
        });

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

                {/* <TouchableOpacity onPress={() => this._googleLogin()}>
                    <Image
                        syle={styles.loginButton}
                        source={require('../../img/login_buttons/google.png')}
                    />
                </TouchableOpacity> */}

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