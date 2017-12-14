import React, {Component} from 'react';
import styles from "../../../resources/styles/common_style";
import {Image, Text, TouchableOpacity, View} from "react-native";
import * as firebase from "firebase/index";
import {AccessToken, LoginManager} from "react-native-fbsdk";
import {firebaseConnect, firebaseLoginFlow} from "../../../util/firebase_login";

export default class IOSLoginDefaultComponent extends Component {

    render() {
        const {loggingIn} = this.props;

        if (loggingIn) {
            return IOSLoginDefaultComponent.renderLoggingInScreen();
        }

        return this.renderLoginOptionsScreen();
    }

    static renderLoggingInScreen() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    Logging In
                </Text>
            </View>
        );
    }

    renderLoginOptionsScreen() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    GamePortal
                    {'\n\n'}
                </Text>

                {this.renderFacebookLoginButton()}
                {this.renderEmailLoginButton()}
                {this.renderAnonymousLoginButton()}
            </View>
        );
    }

    renderFacebookLoginButton() {
        return (
            <TouchableOpacity onPress={() => this.facebookLogin()}>
                <Image
                    source={require('../../../resources/img/login_buttons/facebook.png')}
                />
            </TouchableOpacity>
        );
    }

    renderEmailLoginButton() {
        const { switchScreen } = this.props;

        return (
            <TouchableOpacity onPress={() => switchScreen('LoginEmail')}>
                <Image
                    source={require('../../../resources/img/login_buttons/email.png')}
                />
            </TouchableOpacity>
        );
    }

    renderAnonymousLoginButton() {
        return (
            <TouchableOpacity onPress={() => this.anonymousLogin()}>
                <Image
                    source={require('../../../resources/img/login_buttons/anonymous.png')}
                />
            </TouchableOpacity>
        );
    }

    facebookLogin() {
        const { setLoggingIn } = this.props;

        setLoggingIn();

        LoginManager.logInWithReadPermissions(['public_profile']).then((fbResult) => { // Facebook accepted login
            if (!fbResult.isCancelled) { // User accepted login

                AccessToken.getCurrentAccessToken().then((accessToken) => {
                    let credential = firebase.auth.FacebookAuthProvider.credential(accessToken.accessToken);
                    this.login(true, "facebook", credential, accessToken.accessToken, "");
                }).catch((err) => { // Error retrieving access token
                    this.login(false, "facebook", undefined, undefined, err);
                })
            } else { // User rejected login
                this.login(false, "facebook", undefined, undefined, 'User rejected');
            }
        }).catch(err => {
            this.login(false, "facebook", undefined, undefined, err);
        });
    }

    anonymousLogin() {

        const { setLoggingIn } = this.props;

        setLoggingIn();
        this.login(true, "anonymous", IOSLoginDefaultComponent.selectRandomUsername(), null, null);
    }

    login(success, credentialType, credential, accessToken, message) {
        if (success) {
            let loginObject = {
                credential: credential,
                credentialType: credentialType,
                accessToken: accessToken
            };

            firebaseLoginFlow(loginObject).then(firebaseUser => {
                firebaseConnect(firebaseUser.uid);
                this.finishLogin(true, firebaseUser);
            });
        } else {
            this.finishLogin(false, message);
        }
    }

    finishLogin(success, payload) {

        const { setLoggedInUser, switchScreen, setLoggedOut, resetGroups } = this.props;

        if (success) {
            setLoggedInUser(payload.displayName, payload.photoURL, payload.uid);
            resetGroups();
            switchScreen('Home');
        } else {
            alert(payload);
            setLoggedOut();
        }
    }

    static selectRandomUsername() {
        let prefix = ['Fat', 'Skinny', 'Fast', 'Slow', 'Stinky', 'Naked', 'Obese', 'Flatulent', 'Sick', 'Nasty',
            'Smelly', 'Rotund', 'Poor', 'Rich', 'Messy', 'Shy', 'Braggadocios'];

        let suffix = ['Dog', 'Cat', 'Llama', 'Fish', 'Lizard', 'Snake', 'Hamster', 'Gerbil', 'Rabbit', 'Rat', 'Mouse',
            'Fox', 'Hedgehog', 'Pig', 'Cow', 'Horse', 'Sheep', 'Chicken', 'Turkey', 'Rooster'];

        return prefix[Math.floor(Math.random()*prefix.length)] + suffix[Math.floor(Math.random()*suffix.length)];
    }

}