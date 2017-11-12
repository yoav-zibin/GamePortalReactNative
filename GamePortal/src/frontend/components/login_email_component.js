import React, {Component} from 'react';

import { AsyncStorage, Button, Image, Text, TextInput, View } from 'react-native';

import * as firebase from 'firebase';

import styles from '../styles/common_style'
import {firebaseConnect, saveUserObject} from "../../backend/users/login";

export default class LoginEmailComponent extends Component {

    constructor(props) {
        super(props);
        this.emailAddress = "";
        this.password = ""
    }

    _login() {
        const { setLoading, setLoggedInUser, switchScreen } = this.props;

        setLoading(true);

        firebase.auth().signInWithEmailAndPassword(this.emailAddress, this.password).then((firebaseUser) => { //firebase login successful
            let userData = {
                'credentialType': "email",
                'accessToken': "",
                'username': firebaseUser.displayName,
                'avatarURL': "https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png",
                'firebaseUserId': firebaseUser.uid,
                "email": this.emailAddress,
                "password": this.password
            };

            AsyncStorage.setItem('userData', JSON.stringify(userData));

            saveUserObject(firebaseUser).then(() => {
                firebaseConnect(firebaseUser.uid);
                setLoggedInUser(firebaseUser.displayName, "https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png", firebaseUser.uid);
                setLoading(false);
                switchScreen('Home');
            }).catch(error => alert(error));


        }).catch((error) => { // login to firebase failed
            alert(error);
            setLoading(false);
        });

    }

    render() {

        const { switchScreen } = this.props;

        return (
            <View style={styles.container}>

                <Text style={styles.header}>
                    Email Login
                    {'\n'}
                </Text>

                <Text>Email Address</Text>

                <TextInput style={styles.textInput}
                    onChangeText = { (text) => this.emailAddress = text }
                />

                <Text>
                    {'\n\n'}
                    Password
                    {'\n'}
                </Text>

                <TextInput style={styles.textInput}
                    secureTextEntry={true}
                    onChangeText = { (text) => this.password = text }
                />

                <Text>
                    {'\n'}
                </Text>

                <Button
                    onPress = { () => this._login() }
                    title = "Login"
                />

                <Text>
                    {'\n\n'}
                    Don't have an account?
                    {'\n\n'}
                </Text>

                <Button
                    onPress = { () => switchScreen('CreateAccount') }
                    title = "Create Account"
                />
            </View>
        );
    }
}