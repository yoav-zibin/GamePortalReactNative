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

    tabbedContainer: {
        flex: 0.9,
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: width
    },

    tabButton: {
        backgroundColor: 'white'
    },

    tabButtonSelected: {
        color: 'blue'
    },

    topBar: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#dbe2e4',
        width: width
    },

    profilePicture: {
        marginLeft: 10,
        width: 50,
        height: 50,
    },

    header: {
        fontSize: 25,
        color: 'black',
        textAlign: 'center',
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

    signoutButton: {
        height: 10,
        marginRight: 10
    },

    textInput: {
        width: width,
        borderWidth: 1
    }
});

export default styles;