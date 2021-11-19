import Colours from './colours'
import { Dimensions, StyleSheet } from 'react-native'
export default {
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    backgroundContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colours.dark_yellow,
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        width: '90%',
        color: 'white',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
        borderBottomColor: Colours.light_yellow,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    buttonContainer: {
        alignSelf: 'flex-end',
        marginHorizontal: Dimensions.get('window').width * 0.15,
        marginVertical: Dimensions.get('window').width * 0.1,
    },
    button: {
        padding: 12,
        backgroundColor: Colours.light_yellow,
        textAlign: 'center',
        borderRadius: 150,
        shadowColor: 'black',
        shadowRadius: 40,
        elevation: 3,
        zIndex: 3,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        marginTop: 20,
    },
    buttonLabel: {
        color: Colours.dark_yellow,
        textAlign: 'center',
    },
    settingsButton: {
        top: 20,
        right: 5,
        alignSelf: 'flex-end',
        position: 'absolute',
        textAlign: 'center',
        borderRadius: 100,
        zIndex: 3, // works on ios
        elevation: 3, // works on android
    },
    settingsBox: {
        top: 20,
        right: 5,
        position: 'absolute',
    },
    touchableButton: {
        padding: 10,
    },
    touchableButtonLabel: {
        color: Colours.light_yellow,
    },
    menuStyle: {
        backgroundColor: Colours.dark_yellow,
    },
    menuItemStyle: {
        minWidth: '100%',
    },
    menuItemTextStyle: {
        color: 'white',
    },
}
