import React, {Component} from 'react';
import styles from "../../../../frontend/styles/common_style";
import {Button, Text, TextInput, View} from "react-native";
import * as firebase from "firebase/index";
import {firebaseConnect} from "../../../../backend/users/login";

export default class CreateAccountComponent extends Component {

    constructor() {
        super();
        this.emailAddress = "";
        this.password = "";
        this.displayName = "";
    }

    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.header}>
                    Create Account
                </Text>

                {this.renderDisplayNameEntry()}
                {this.renderEmailAddressEntry()}
                {this.renderPasswordEntry()}
                {this.renderCreateAccountButton()}

            </View>
        );
    }

    renderDisplayNameEntry() {
        return (
            <View>
                <Text>Display Name</Text>

                <TextInput style={styles.textInput}
                           onChangeText={(text) => this.displayName = text}
                />
            </View>
        );
    }

    renderEmailAddressEntry() {
        return (
            <View>
                <Text>
                    {'\n\n'}
                    Email Address
                    {'\n\n'}
                </Text>

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
                    {'\n\n'}
                </Text>

                <TextInput style={styles.textInput}
                           secureTextEntry={true}
                           onChangeText={(text) => this.password = text}
                />

            </View>
        );
    }

    renderCreateAccountButton() {
        return (
            <View>
                <Text>
                    {'\n'}
                </Text>

                <Button
                    onPress={() => this.createAccount()}
                    title="Create Account"
                />
            </View>
        );
    }

    createAccount() {
        const {setLoggedInUser, setLoading, switchScreen} = this.props;

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
}