import React, {Component} from 'react'
import styles from "../../resources/styles/common_style";
import {AsyncStorage, Button, Image, Text, View } from "react-native";
import * as firebase from "firebase/index";
import {firebaseConnect} from "../../util/firebase_login";

export default class SplashComponent extends Component {

    componentWillMount() {
        this.setReturningOrNewUser();
    }

    render() {

        const { loading, loggedIn } = this.props;

        if (loading) {
            return SplashComponent.renderLoadingScreen();
        }

        if (loggedIn) {
            return this.renderReturningWelcomeScreen();
        }

        return this.renderNewUserWelcomeScreen();

    }

    static renderLoadingScreen() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    Please Wait
                </Text>
            </View>
        );
    }

    renderReturningWelcomeScreen() {

        const { username, avatarURL } = this.props;

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
                    onPress={() => this.playAsReturningUser()}
                    title={continueMessage}
                />


                <Text>
                    {'\n'}
                </Text>

                <Button
                    onPress={() => this.playAsSomebodyElse()}
                    title="Play as Someone Else"
                    color="#841584"
                />
            </View>
        );
    }

    renderNewUserWelcomeScreen() {

        const { switchScreen } = this.props;


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
                    onPress={() => switchScreen('LoginDefault')}
                    title="Sign in to play"
                />
            </View>
        );
    }

    setReturningOrNewUser() {

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
                    firebase.auth().signInWithEmailAndPassword(userData.email, userData.password).then(() => {
                        setLoggedInUser(userData.username, userData.avatarURL, userData.firebaseUserId);
                    }).catch((err) => {
                        alert(err);
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
                }
            } else {
                setLoading(false);
            }


        }).catch((error) => {
            alert(error);
            setLoading(false);
        });
    }

    playAsReturningUser() {
        const { setLoading, switchScreen } = this.props;

        AsyncStorage.getItem('userData').then(udJSON => {
            setLoading(true);
            console.ignoredYellowBox = ['Setting a timer'];
            firebaseConnect(JSON.parse(udJSON).firebaseUserId);
            setLoading(false);
            switchScreen('Home');
        });
    }

    playAsSomebodyElse() {
        console.ignoredYellowBox = ['Setting a timer'];

        const { setLoading, setLoggedOut, switchScreen } = this.props; //actions
        const { userId } = this.props;
        setLoading(true);

        firebase.database().ref('/users/' + userId + '/publicFields').once('value').then(response => {
            let r = response.val();

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
}