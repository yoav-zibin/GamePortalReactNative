import React, { Component } from 'react';

import {
    AppRegistry,
    Text,
    View,
    Navigator,
    AsyncStorage
} from 'react-native';

// import * as firebase from 'firebase';

import Signup from './src/ios/pages/signup';
import Account from './src/ios/pages/account';

import Header from './src/ios/components/header';

// let app = new Firebase('universalgamemaker.firebaseio.com');

import styles from './src/styles/common-styles.js';

export default class FirebaseLogin extends Component {    

    constructor(props){
        super(props);
        this.state = {
            component: null,
            loaded: false
        };
    }

    componentWillMount(){
        AsyncStorage.getItem('user_data').then((user_data_json) => {
            let user_data = JSON.parse(user_data_json);
            let component = {component: Signup};
            if(user_data != null){
                app.authWithCustomToken(user_data.token, (error, authData) => {
                    if(error){
                        this.setState(component);
                    } else {
                        this.setState({component: Account});
                    }
                });
            } else {
                this.setState(component);
            }
        });
    }

    render(){
        if(this.state.component){
            console.log('signup component');
            return (
                <Navigator
                    initialRoute={{component: this.state.component}}
                    renderScene={(route, navigator) => {
                        if(route.component){
                            return React.createElement(route.component, { navigator });
                        }
                    }}
                />
            );
        } else {
            return (
                <View style={styles.container}>
                    <Header text="React Native Firebase Auth" loaded={this.state.loaded} />  
                    <View style={styles.body}></View>
                </View>
            );
        }
    }

}

AppRegistry.registerComponent('FirebaseLogin', () => FirebaseLogin);