import React, {Component} from 'react';

import { AsyncStorage, Button, Image, Text, View } from 'react-native';

import * as firebase from 'firebase';

import styles from '../../styles/ios_style'

export default class HomeComponent extends Component {

    constructor(props) {
        super(props);
    }

    _signOut() {

        const { setLoading, setLoggedOut, switchScreen } = this.props; //actions
        setLoading(true);

        firebase.auth().signOut().catch((error) => {
            alert(error) //firebase failed signout
        });

        AsyncStorage.removeItem('userData').then(() => { //Delete user from our storage
            setLoggedOut();
            setLoading(false);
            switchScreen('Splash');
        });
    }


    render() {

        const { username, avatarURL, loading } = this.props;

        if (loading) {
            return (
              <View style={styles.container} >
                  <Text style={styles.header}>
                      Please Wait
                  </Text>
              </View>
            );
        }

        return (
            <View style={styles.container}>
                <Image
                style={{width: 75, height: 75}}
                source={{uri: avatarURL}}
                />

                <Text>
                    {'\n\n'}
                    Welcome, {username}
                    {'\n\n'}
                </Text>

                <Button
                    onPress = {() => this._signOut()}
                    title="Sign Out"
                    color="#841584"
                />
        </View>);
    }
}