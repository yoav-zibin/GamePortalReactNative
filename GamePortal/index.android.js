import React, {Component} from 'react';
import {AppRegistry, BackHandler, View} from 'react-native';
import {Provider} from 'react-redux';
import * as firebase from 'firebase';
import styles from './src/resources/styles/common_style';
import {SplashContainer} from "./src/screens/splash/container";
import {switchScreen} from "./src/shared/screen/actions";
import {AndroidLoginDefaultContainer} from "./src/screens/login/default/container";
import {LoginEmailContainer} from "./src/screens/login/email/login/container";
import {CreateAccountContainer} from "./src/screens/login/email/create/container";
import {HomeContainer} from "./src/screens/home/container";
import {CreateGroupContainer} from "./src/screens/group_creator/container";
import {ChatContainer} from "./src/screens/chat/container";
import {GameCenterContainer} from "./src/screens/game_center/container";
import {GameRendererContainer} from "./src/screens/game_renderer/container";
import { store } from './src/store'


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
                case 'CreateGroup':
                    newScreen = 'Home';
                    break;
                case 'Chat':
                    newScreen = 'Home';
                    break;
                case 'GameCenter':
                    newScreen = 'Chat';
                    break;
                case 'GameRenderer':
                    newScreen = 'GameCenter';
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
                return (<AndroidLoginDefaultContainer />);
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
