import React from 'react';
import * as firebase from 'firebase';
import FireAuth from 'react-native-firebase-auth';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Image
} from 'react-native';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDA5tCzxNzykHgaSv1640GanShQze3UK-M",
  authDomain: "universalgamemaker.firebaseapp.com",
  databaseURL: "https://universalgamemaker.firebaseio.com",
  storageBucket: "universalgamemaker.appspot.com"
};

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {

  _putInData() {
    firebase.database().ref('users/' + 'testId').set()
  }

	render() {
		return (
			<View style={styles.container}>
				<Image source={require('./components/images/login.png')} />
				<TouchableOpacity onPress={this._putInData}>
					<Text style={styles.text}>Login with Facebook</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F0F8FF',
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontSize: 20,
		margin: 50,
	}
});
