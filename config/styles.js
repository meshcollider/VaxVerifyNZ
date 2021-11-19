import Colours from './colours'
import { Dimensions } from 'react-native'
export default {
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
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
        padding: 10
    },
    menuStyle: {
        backgroundColor: Colours.dark_yellow,
    },
    menuItemTextStyle: {
        color: 'white',
    },
    
}
