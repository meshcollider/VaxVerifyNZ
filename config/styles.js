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
    button: {
        padding: 10,
        backgroundColor: Colours.light_yellow,
        alignSelf: 'flex-end',
        marginVertical: 50,
        marginHorizontal: Dimensions.get('window').width * 0.15,
        marginLeft: 0,
        textAlign: 'center',
        borderRadius: 150,
        shadowColor: 'black',
        shadowRadius: 40,
        elevation: 3,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
    },
    buttonLabel: {
        color: Colours.dark_yellow,
        textAlign: 'center',
    },
    settingsButton: {
        top: 20,
        right: 5,
        padding: 10,
        backgroundColor: 'transparent',
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
}
