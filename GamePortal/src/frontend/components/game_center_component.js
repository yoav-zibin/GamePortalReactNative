import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';
import NavigationBar from 'react-native-navbar';
import { 
    Text, 
    View, 
    Image,
    TextInput, 
    ScrollView, 
    AsyncStorage 
} from 'react-native';

import * as firebase from 'firebase';

import styles from '../styles/common_style'

export default class gameCenterComponent extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { currentGameId, boardImage, boardImageId, setBoardImageURL } = this.props;

        let imageId = boardImageId;
        let imageURL;
        firebase.database().ref('gameBuilder/images/' + imageId).once('value').then(image => {
            let jsonString = JSON.stringify(image);
            let imageParsed = JSON.parse(jsonString);
            console.log(imageParsed)
            setBoardImageURL(imageParsed.downloadURL);
        }).catch(error => alert(error));  
        
        console.log(boardImage);
    }

    render() {
        const { currentGameName, boardImage, loading } = this.props;
        console.log(boardImage);

        if (loading) {
            return (
                <View style={styles.container}>
                    <Text style={styles.header}>
                        Loading game spec information
                    </Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                {/* <View style={styles.headerContainer}>
                    <NavigationBar
                        title={{title: currentGameName}}
                    />
                </View> */}
                <View>
                    <Image
                        style={{width: 66, height: 58}}
                        source={{uri: boardImage.url}}
                    />
                </View>
            </View>
        );
    }
}