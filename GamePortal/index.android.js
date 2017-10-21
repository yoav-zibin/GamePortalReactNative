import React, {Component} from 'react';
import {
    AppRegistry, BackHandler, View
} from 'react-native';

import {
    Provider
} from 'react-redux';

import * as firebase from 'firebase';

import store from './src/frontend/store/configure_store';
import styles from './src/frontend/styles/common_style';
import { SplashContainer } from './src/frontend/containers/splash_container';
import { LoginDefaultContainer } from './src/frontend/containers/android/login_default_container'
import { HomeContainer } from './src/frontend/containers/home_container'
import { LoginEmailContainer } from "./src/frontend/containers/login_email_container";
import { CreateAccountContainer } from "./src/frontend/containers/create_account_container";


import {switchScreen} from "./src/frontend/actions/screen_actions";


// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDmRQIcz7cPJXu28k9bo43b9nqQCI4naxE",
    authDomain: "universalgamemaker.firebaseapp.com",
    databaseURL: "https://universalgamemaker.firebaseio.com",
    storageBucket: "universalgamemaker.appspot.com"
};

firebase.initializeApp(firebaseConfig);

export default class GamePortalReactNative extends Component {

    constructor(props) {
        super(props);

        this.state = {
            screen: store.getState().screen.screen
        };

        store.subscribe(() => {
           if (store.getState().screen.screen !== this.state.screen) {
               this.setState({
                   screen: store.getState().screen.screen
               });
           }
        });
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", () => {
            let screen = this.state.screen;
            let newScreen = undefined;

            switch (screen) {
                case 'LoginDefault':
                    newScreen = 'Splash';
                    break;
                case 'LoginEmail':
                    newScreen = 'LoginDefault';
                    break;
                case 'CreateAccount':
                    newScreen = 'LoginEmail';
                    break;
                case 'Home':
                    newScreen = 'Splash';
                    break;
                case 'Splash':
                    return false;
            }

            if (newScreen !== undefined) {
                store.dispatch(switchScreen(newScreen))
            }

            return true;
        });
    }

    renderContainer() {
        let screen = this.state.screen;

        switch (screen) {
            case 'LoginDefault':
                return (<LoginDefaultContainer />);
            case 'LoginEmail':
                return (<LoginEmailContainer />);
            case 'CreateAccount':
                return (<CreateAccountContainer />);
            case 'Home':
                return (<HomeContainer />);
            default:
                return (<SplashContainer/>);
        }
    }

    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    {this.renderContainer()}
                </View>
            </Provider>
        )
    }
}

AppRegistry.registerComponent('GamePortalReactNative', () => GamePortalReactNative);
