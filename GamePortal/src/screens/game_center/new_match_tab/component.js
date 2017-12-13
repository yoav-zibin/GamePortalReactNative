import React, {Component} from "react";
import styles from "../../../resources/styles/common_style";
import {Text, View} from "react-native";

export default class NewMatchTabComponent extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    New Match Tab
                </Text>
            </View>
        );
    }
}