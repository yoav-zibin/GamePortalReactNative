import React, {Component} from 'react';

import { AsyncStorage, Button, Image, Text, View } from 'react-native';
import Tabs from 'react-native-tabs';

import * as firebase from 'firebase';

import styles from '../styles/common_style'

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

    _renderTab() {
        const { tab } = this.props;

        switch(tab) {
            case 'tabChats':
                return (
                    <View>
                        <Text>Chats</Text>
                    </View>
                );
            case 'tabFriends':
                return (
                  <View>
                      <Text>Friends</Text>
                  </View>
                );
            case 'tabActive':
                return (
                  <View>
                      <Text>Online Users</Text>
                  </View>
                );
            default:
                return (
                  <View>
                      <Text>Search</Text>
                  </View>
                );
        }
    }


    render() {

        const { username, avatarURL, loading, tab } = this.props;
        const { switchTab } = this.props;

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

                <View style={styles.topBar}>
                    <Image
                        style={styles.profilePicture}
                        source={{uri: avatarURL}}
                    />

                    <Text style={styles.header}>{username}</Text>

                    <Button
                        style={styles.signoutButton}
                        onPress = {() => this._signOut()}
                        title="Sign Out"
                        color="#841584"
                    />
                </View>

                <View style={styles.tabbedContainer}>

                    {this._renderTab()}

                    <Tabs
                        selected={tab}
                        style={styles.tabButton}
                        selectedStyle={styles.tabButtonSelected}
                        onSelect={selected => switchTab(selected.props.name)}
                    >
                        <Text name="tabChats">Chats</Text>
                        <Text name="tabFriends">Friends</Text>
                        <Text name="tabActive">Active</Text>
                        <Text name="tabSearch">Search</Text>
                    </Tabs>
                </View>

        </View>);
    }
}