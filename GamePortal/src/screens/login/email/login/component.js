import React, {Component} from 'react';
import styles from "../../../../resources/styles/common_style";
import {AsyncStorage, Button, TextInput, View} from "react-native";
import Text from "react-native-elements/src/text/Text";
import * as firebase from "firebase/index";
import {firebaseConnect, saveUserObject} from "../../../../util/firebase_login";

export default class LoginEmailComponent extends Component {

    constructor() {
        super();
        this.emailAddress = "";
        this.password = ""
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    Email Login
                    {'\n'}
                </Text>

                {this.renderEmailAddressEntry()}
                {this.renderPasswordEntry()}
                {this.renderLoginButton()}
                {this.renderCreateAccountSection()}
            </View>
        );
    }

    renderEmailAddressEntry() {
        return (
            <View>
                <Text>Email Address</Text>

                <TextInput style={styles.textInput}
                           onChangeText={(text) => this.emailAddress = text}
                />
            </View>
        );
    }

    renderPasswordEntry() {
        return (
            <View>
                <Text>
                    {'\n\n'}
                    Password
                    {'\n'}
                </Text>

                <TextInput style={styles.textInput}
                           secureTextEntry={true}
                           onChangeText={(text) => this.password = text}
                />
            </View>
        );
    }

    renderLoginButton() {
        return (
            <View>
                <Text>
                    {'\n'}
                </Text>

                <Button
                    onPress = { () => this.login() }
                    title = "Login"
                />
            </View>
        );
    }

    renderCreateAccountSection() {
        const { switchScreen } = this.props;

        return (
            <View>
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

    login() {
        const { setLoading, setLoggedInUser, switchScreen, resetGroups } = this.props;

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
                resetGroups();
                switchScreen('Home');
            }).catch(error => alert(error));


        }).catch((error) => { // login to firebase failed
            alert(error);
            setLoading(false);
        });
    }


}