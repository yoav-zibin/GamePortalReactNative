import React, {Component} from 'react';

import ReactNative from 'react-native';

import { AsyncStorage, Button, Image, Text, View, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import * as firebase from 'firebase';

import styles from '../styles/common_style'

export default class ChatComponent extends Component {

    constructor(props) {
        super(props);
    }

    _scrollToInput(reactRef) {
        this.refs.scroll.scrollToFocusedInput(ReactNative.findNodeHandle(reactRef));
    }

    render() {
        const { username, avatarURL, switchScreen, loading } = this.props;
        if (loading) {
            return (
                <View style={styles.container} >
                    <Text style={styles.header}>
                        Loading chat information
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

                    <Text style={styles.header}>Global Chat</Text>

                    <Button
                        style={styles.backButton}
                        onPress = {() => switchScreen('Home')}
                        title="Back"
                        color="#841584"
                    />
                </View>

                <KeyboardAwareScrollView
                    style={{ backgroundColor: '#4c69a5' }}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    contentContainerStyle={styles.container}
                    scrollEnabled={false}
                >
                    <View>
                        <TextInput
                            onChangeText={(text) => sendMessage(text, this.props.user)}
                            placeholder="Email"
                            style={styles.textInput}
                        />
                        <TextInput
                            placeholder="Email"
                            style={styles.textInput}
                        />
                        <TextInput
                            placeholder="Email"
                            style={styles.textInput}
                        />
                        <TextInput
                            placeholder="Email"
                            style={styles.textInput}
                        />
                        <TextInput
                            placeholder="Email"
                            style={styles.textInput}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}