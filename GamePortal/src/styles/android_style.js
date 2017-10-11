import {
    Dimensions, StyleSheet
} from 'react-native';

const width = Dimensions.get('window').width; //full width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

    header: {
        fontSize: 50,
        color: 'black',
        textAlign: 'center'
    },

    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },

    loginButton: {
        margin: 10,
    },

    textInput: {
        width: width,
        borderWidth: 1
    }
});

export default styles;