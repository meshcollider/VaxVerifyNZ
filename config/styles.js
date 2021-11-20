import Colours from './colours'
import { Dimensions, StyleSheet } from 'react-native'

export default {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#111111',
    },
    iconText: {
        lineHeight: 60,
    },
    cameraText: {
        fontFamily: 'WorkSans_Bold',
        fontSize: 25,
        textAlign: 'center',
        width: '70%',
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
        shadowRadius: 60,
        elevation: 3,
        zIndex: 3,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        marginTop: 20,
    },
    backButton: {
        padding: 12,
        backgroundColor: Colours.light_yellow,
        textAlign: 'center',
        borderRadius: 150,
        shadowColor: 'black',
        shadowRadius: 60,
        elevation: 3,
        zIndex: 3,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        top: 40,
    },
    buttonLabel: {
        color: Colours.dark_yellow,
        textAlign: 'center',
        fontFamily: 'WorkSans_Medium',
    },
    backButtonLabel: {
        color: Colours.dark_yellow,
        textAlign: 'center',
        fontFamily: 'WorkSans_Medium',
        fontSize: 26,
        lineHeight: 35,
    },
    settingsBox: {
        position: 'absolute',
        top: 60,
        left: 0,
        right: 0,
        zIndex: 3,
    },
    settingsButton: {
        alignSelf: 'center',
        backgroundColor: Colours.light_yellow,
        elevation: 3,
        borderRadius: 100,
        shadowColor: 'black',
        shadowRadius: 60,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
    },
    touchableButtonLabel: {
        color: Colours.dark_yellow,
        width: 70,
        textAlign: "center",
    },
    menuStyle: {
        backgroundColor: Colours.dark_yellow,
        borderRadius: 25,
        marginTop: 35,

        // Overrides properties in the Menu Library
        left: 'auto', 
        alignSelf: 'center',
    },
    menuItemStyle: {
        minWidth: 200,
        margin: 5,
        alignItems: 'center',
    },
    menuItemTextStyle: {
        color: 'white',
        fontFamily: 'WorkSans_SemiBold',
        fontSize: 15,
    },
    centeredView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    aboutView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    textButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: Colours.light_yellow,
        width: 100,
    },
    buttonText: {
        color: Colours.dark_yellow,
        fontFamily: 'WorkSans_Bold',
        fontSize: 18,
        textAlign: 'center',
    },
    aboutTitle: {
        textAlign: 'center',
        fontFamily: 'WorkSans_Light',
        fontSize: 35,
    },
    aboutVersion: {
        textAlign: 'center',
        fontFamily: 'WorkSans_Bold',
        fontSize: 20,
    },
    aboutText: {
        textAlign: 'center',
        fontFamily: 'WorkSans_Medium',
        fontSize: 15,
        lineHeight: 35,
        color: 'black',
    },
    devLink: {
        backgroundColor: Colours.light_yellow,
        color: Colours.dark_yellow,
        fontSize: 17,
        lineHeight: 30,
        fontFamily: 'WorkSans_Bold',
    },
    bold: {
        fontFamily: 'WorkSans_Bold',
    },
    successBadge: {
        width: Dimensions.get('window').width * 0.8,
        height: 70,
        backgroundColor: Colours.light_green,
        borderRadius: 60,
        shadowColor: 'black',
        shadowRadius: 60,
        elevation: 3,
        zIndex: 3,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    successBadgeText: {
        fontSize: 26,
        fontFamily: 'WorkSans_Medium',
        color: Colours.dark_green,
        lineHeight: 35,
    },
    errorBadge: {
        width: Dimensions.get('window').width * 0.8,
        height: 70,
        backgroundColor: Colours.light_red,
        borderRadius: 60,
        shadowColor: 'black',
        shadowRadius: 60,
        elevation: 3,
        zIndex: 3,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorBadgeText: {
        fontSize: 26,
        fontFamily: 'WorkSans_Medium',
        color: Colours.dark_red,
        lineHeight: 35,
    },
    cardBack: {
        top: Dimensions.get('window').height * 0.02,
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height * 0.6,
        backgroundColor: Colours.light_yellow,
        borderRadius: 30,
        shadowColor: 'black',
        shadowRadius: 60,
        elevation: 3,
        zIndex: 3,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        padding: 35,
    },
    errorCardBack: {
        top: Dimensions.get('window').height * 0.02,
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height * 0.6,
        backgroundColor: Colours.light_red,
        borderRadius: 30,
        shadowColor: 'black',
        shadowRadius: 60,
        elevation: 3,
        zIndex: 3,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        padding: 35,
    },
    card: {
        position: 'absolute',
        width: Dimensions.get('window').width * 0.75,
        height: Dimensions.get('window').height * 0.6 - Dimensions.get('window').width * 0.05,
        backgroundColor: 'white',
        borderRadius: 30,
        shadowColor: 'black',
        shadowRadius: 60,
        elevation: 3,
        zIndex: 3,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        padding: 35,
    },
    cardTitle: {
        marginTop: 20,
        fontSize: 40,
        fontFamily: 'WorkSans_Light',
    },
    cardText: {
        marginTop: 40,
        fontSize: 20,
        fontFamily: 'WorkSans_Medium',
        lineHeight: 28,
    },
}
