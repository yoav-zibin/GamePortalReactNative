import React, {Component} from 'react';
import {AppRegistry, View} from 'react-native';
import {Provider} from 'react-redux';
import * as firebase from 'firebase';
import store from './src/frontend/store/configure_store';
import styles from './src/frontend/styles/common_style';
import { iOSLoginDefaultContainer } from "./src/screens/login/default/container";
import {SplashContainer} from "./src/screens/splash/container";
import {LoginEmailContainer} from "./src/screens/login/email/login/container";
import {CreateAccountContainer} from "./src/screens/login/email/create/container";
import {HomeContainer} from "./src/screens/home/container";
import {CreateGroupContainer} from "./src/screens/group_creator/container";
import {ChatContainer} from "./src/screens/chat/container";
import {GameCenterContainer} from "./src/screens/game_center/container";
import {GameRendererContainer} from "./src/screens/game_renderer/container";


// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDmRQIcz7cPJXu28k9bo43b9nqQCI4naxE",
    authDomain: "universalgamemaker.firebaseapp.com",
    databaseURL: "https://universalgamemaker.firebaseio.com",
    storageBucket: "universalgamemaker.appspot.com"
};

firebase.initializeApp(firebaseConfig);

export default class GamePortalReactNative extends Component {

    constructor() {
        super();

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

    renderContainer() {
        let screen = this.state.screen;

        switch (screen) {
            case 'LoginDefault':
                return (<iOSLoginDefaultContainer />);
            case 'LoginEmail':
                return (<LoginEmailContainer />);
            case 'CreateAccount':
                return (<CreateAccountContainer />);
            case 'Home':
                return (<HomeContainer />);
            case 'CreateGroup':
                return (<CreateGroupContainer />);
            case 'Chat':
                return (<ChatContainer />);
            case 'GameCenter':
                return (<GameCenterContainer />);
            case 'GameRenderer':
                return (<GameRendererContainer />);
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
