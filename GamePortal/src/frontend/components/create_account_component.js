import React, {Component} from 'react';

import { AsyncStorage, Button, Image, Text, TextInput, View } from 'react-native';

import * as firebase from 'firebase';

import styles from '../styles/common_style'
import { firebaseConnect } from "../../backend/users/login";

export default class CreateAccountComponent extends Component {

    constructor(props) {
        super(props);
        this.emailAddress = "";
        this.password = "";
        this.displayName = "";
    }

    _createAccount() {

        const { setLoggedInUser, setLoading, switchScreen } = this.props;

        setLoading(true);

        firebase.auth().createUserWithEmailAndPassword(this.emailAddress, this.password).then((firebaseUser) => { //account created successfully
            //now we need to set the display name
            firebaseUser.updateProfile({
                displayName: this.displayName
            }).then(() => {
                firebaseConnect(firebaseUser.uid);
                setLoggedInUser(this.displayName, null, firebaseUser.uid);
                setLoading(false);
                switchScreen('Home')
            });
        }).catch((error) => { // firebase rejected the account
            alert(error);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    Create Account
                </Text>

                <Text>Display Name</Text>

                <TextInput style={styles.textInput}
                           onChangeText = { (text) => this.displayName = text }
                />


                <Text>
                    {'\n\n'}
                    Email Address
                    {'\n\n'}
                </Text>

                <TextInput style={styles.textInput}
                    onChangeText = { (text) => this.emailAddress = text }
                />

                <Text>
                    {'\n\n'}
                    Password
                    {'\n\n'}
                </Text>

                <TextInput style={styles.textInput}
                    secureTextEntry={true}
                    onChangeText = { (text) => this.password = text }
                />

                <Text>
                    {'\n'}
                </Text>

                <Button
                    onPress = { () => this._createAccount() }
                    title = "Create Account"
                />
            </View>
        );
    }
}