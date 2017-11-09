import React, {Component} from 'react';

import {
    AsyncStorage, Button, Image, Text, View
} from 'react-native';

import * as firebase from 'firebase';

import styles from '../styles/common_style'
import { firebaseConnect} from "../../backend/users/login";
import {switchScreen} from "../actions/screen_actions";
import {setLoggingIn} from "../actions/user_actions";

export default class SplashComponent extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {

        const { setLoading, setLoggedInUser } = this.props;

        setLoading(true);

        AsyncStorage.getItem('userData').then((udJSON) => {
            let userData = JSON.parse(udJSON);
            let credential = null;

            if (userData !== null) {

                if (userData.credentialType === 'facebook') {
                    credential = firebase.auth.FacebookAuthProvider.credential(userData.accessToken);
                } else if (userData.credentialType === 'google') {
                    credential = firebase.auth.GoogleAuthProvider.credential(userData.accessToken);
                } else if (userData.credentialType === 'email') {
                    firebase.auth().signInWithEmailAndPassword(userData.email, userData.password).then((firebaseUser) => {
                        setLoggedInUser(userData.username, userData.avatarURL, userData.firebaseUserId);
                        setLoading(false);
                    }).catch((err) => {
                        alert(err);
                        setLoading(false);
                    })
                }

                if (credential !== null) {
                    firebase.auth().signInWithCredential(credential).then(() => { //Firebase accepted credential
                        setLoggedInUser(userData.username, userData.avatarURL, userData.firebaseUserId);
                        setLoading(false);
                    }, (error) =>{ //Firebase rejected Facebook login
                        alert(error);
                        setLoading(false);
                    })
                } else {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }

        }).catch((error) => {
            alert(error);
            setLoading(false);
        });
    }

    _playAsSavedUser() {
        const { setLoading, switchScreen } = this.props;

        AsyncStorage.getItem('userData').then(udJSON => {
            setLoading(true);
            console.ignoredYellowBox = ['Setting a timer'];
            firebaseConnect(JSON.parse(udJSON).firebaseUserId);
            setLoading(false);
            switchScreen('Home');
        });
    }

    _playAsSomeoneElse() {

        console.ignoredYellowBox = ['Setting a timer'];

        const { setLoading, setLoggedOut, switchScreen } = this.props; //actions
        const { userId } = this.props;
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
            switchScreen('LoginDefault');
        });
    }

    render() {
        const { loading, loggedIn, username, avatarURL } = this.props; //state
        const { switchScreen } = this.props; //actions

        if (!loading) {
            if (loggedIn) {
                let continueMessage = "Continue as " + username;

                return (
                    <View style={styles.container}>
                        <Text style={styles.header}>
                            Welcome back, {username}
                            {'\n\n'}
                        </Text>

                        <Image
                            style={{width: 75, height: 75}}
                            source={{uri: avatarURL}}
                        />

                        <Text>
                            {'\n'}
                        </Text>

                        <Button
                            onPress = {() => this._playAsSavedUser()}
                            title = { continueMessage }
                        />


                        <Text>
                            {'\n'}
                        </Text>

                        <Button
                            onPress = {() => this._playAsSomeoneElse()}
                            title = "Play as Someone Else"
                            color = "#841584"
                        />
                    </View>
                );
            } else {
                return (
                    <View style={styles.container}>

                        <Text style={styles.header}>
                            Welcome to Game Portal
                            {'\n'}
                        </Text>

                        <Text>
                            A place for friends to chat and play
                            {'\n\n'}
                        </Text>

                        <Button
                            onPress = {() => switchScreen('LoginDefault')}
                            title = "Sign in to play"
                        />
                    </View>
                );
            }
        } else {
            return (
                <View style={styles.container}>
                    <Text style={styles.header}>
                        Please Wait
                    </Text>
                </View>
            );
        }
    }
}