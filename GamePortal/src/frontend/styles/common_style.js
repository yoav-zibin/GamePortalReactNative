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
        backgroundColor: 'white',
    },

    headerContainer: {
        flex: 0.1,
        width: width,
        zIndex: 1
    },

    tabbedContainer: {
        flex: 0.9,
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: width
    },

    viewContainer: {
        flex: 0.9,
        width: width
    },

    createGroupView: {
        position: 'absolute',
        bottom: 50,
        width: 150,
        left: (Dimensions.get('window').width / 2) - 75,
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

    listItemView: {
        flex: 0.1,
        borderColor: '#f5fdff',
        borderWidth: 2,
        backgroundColor: '#bae9fb',
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginHorizontal: 15
    },

    signOutButton: {
        position: 'absolute',
        top: 60,
        right: 15
    },

    header: {
        fontSize: 25,
        color: 'black',
        textAlign: 'center',
    },

    chatHeader: {
        color: 'blue',
        fontSize: 30
    },

    chatRoom: {
        width: width,
        flex: 0.7
    },

    chatMessages: {
        width: width,
        flex: 0.1
    },

    gameSpecs: {
        width: width,
        flex: 0.1
    },

    gameSpec: {
        width: width,
        flex: 0.7
    },

    gameContainer: {
        zIndex: 0,
        flex: 0.9,
        position: 'relative'
    },

    canvas: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 0,
    },

    selectGame: {
        width: width,
        flex: 0.7
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

    backButton: {
        height: 10,
        marginRight: 10
    },

    textInput: {
        width: width,
        borderWidth: 1,
    },

    online: {
        color: '#28ba16'
    },

    offline: {
        color: '#b40213'
    }
});

export default styles;