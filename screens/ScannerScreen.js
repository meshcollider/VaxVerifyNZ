import * as React from 'react'
import AppLoading from 'expo-app-loading'
import {
    View,
    Modal,
    Vibration,
    Pressable,
    Linking,
    SafeAreaView,
    Text,
    TouchableOpacity,
    ImageBackground,
} from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu'
import { StatusBar } from 'expo-status-bar'
import Constants from 'expo-constants'

import Texture from '../assets/images/texture.png'
import ScanCamera from '../components/Camera'
import Styles from '../config/styles'
import Colours from '../config/colours'
import useFonts from '../config/useFonts'

export default function ScannerScreen({ navigation }) {
    const [aboutVisible, setAboutVisible] = React.useState(false)
    const [isReady, setIsReady] = React.useState(false)
    const isFocused = useIsFocused()
    const [shouldVibrate, setVibrate] = React.useState(true)
    const [menuVisible, setMenuVisible] = React.useState(false)
    const vibrationStrength = 40

    const LoadFonts = async () => {
        await useFonts()
    }

    React.useEffect(() => {
        ;(async () => {
            const value = await AsyncStorage.getItem('@vaxverifynz-vibrate')
            setVibrate(value === 'true')
        })()
    }, [])

    const toggleVibrate = async () => {
        const newShouldVibrate = !shouldVibrate
        setVibrate(newShouldVibrate)
        if (!shouldVibrate) Vibration.vibrate(vibrationStrength)
        await AsyncStorage.setItem('@vaxverifynz-vibrate', JSON.stringify(newShouldVibrate))
    }

    const hideMenu = () => setMenuVisible(false)
    const showMenu = () => setMenuVisible(true)
    const hideAbout = () => setAboutVisible(false)
    const showAbout = () => {
        setAboutVisible(true), setMenuVisible(false)
    }

    const handleBarCodeScanned = ({ type, data }) => {
        if (shouldVibrate) {
            Vibration.vibrate(vibrationStrength)
        }
        navigation.navigate('ScanResult', { data: data })
    }

    if (!isReady) {
        return (
            <AppLoading
                startAsync={LoadFonts}
                onFinish={() => setIsReady(true)}
                onError={() => {}}
            />
        )
    }

    return (
        <ImageBackground source={Texture} resizeMode="repeat" style={Styles.backgroundContainer}>
            <StatusBar barStyle="light-content" />
            <Modal
                animationType="slide"
                transparent={true}
                visible={aboutVisible}
                onRequestClose={() => {
                    setAboutVisible(!aboutVisible)
                }}
            >
                <View style={Styles.centeredView}>
                    <View style={Styles.aboutView}>
                        <Text style={Styles.aboutTitle}>VaxVerifyNZ</Text>
                        <Text style={Styles.aboutVersion}>
                            {' '}
                            Version{' '}
                            {Constants.nativeAppVersion === null
                                ? 'X.x.x'
                                : Constants.nativeAppVersion}
                        </Text>
                        <Text style={Styles.aboutText}>
                            Made with 💖 in {<Text style={Styles.bold}>2 days</Text>} by
                            {'\n'}
                            {
                                <Text
                                    style={Styles.devLink}
                                    onPress={() => {
                                        Linking.openURL('https://github.com/meshcollider')
                                    }}
                                >
                                    {' '}
                                    Samuel Dobson{' '}
                                </Text>
                            }
                            {'\n'}
                            {<Text style={Styles.bold}>&</Text>}
                            {'\n'}
                            {
                                <Text
                                    style={Styles.devLink}
                                    onPress={() => {
                                        Linking.openURL('https://joshsoong.design')
                                    }}
                                >
                                    {' '}
                                    Joshua Soong{' '}
                                </Text>
                            }
                            {'\n'}
                            with{' '}
                            <Text
                                style={[Styles.aboutText, Styles.bold]}
                                onPress={() => {
                                    Linking.openURL('https://expo.dev')
                                }}
                            >
                                Expo
                            </Text>{' '}
                            &{' '}
                            <Text
                                style={[Styles.aboutText, Styles.bold]}
                                onPress={() => {
                                    Linking.openURL('https://github.com/vaxxnz/nzcp-js')
                                }}
                            >
                                nzcp-js
                            </Text>
                            .{'\n'}
                            {'\n'}
                            {
                                <Text
                                    onPress={() => {
                                        Linking.openURL(
                                            'https://github.com/meshcollider/VaxVerifyNZ'
                                        )
                                    }}
                                >
                                    <MaterialCommunityIcons size={30} name="github" />
                                </Text>
                            }
                            {'\n'}
                        </Text>
                        <Pressable style={[Styles.textButton]} onPress={hideAbout}>
                            <Text style={Styles.buttonText}>Back</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <SafeAreaView style={Styles.settingsBox}>
                <View style={Styles.settingsButton}>
                    <Menu
                        animationDuration={100}
                        visible={menuVisible}
                        anchor={
                            <TouchableOpacity onPress={showMenu} style={Styles.touchableButton}>
                                <Text style={Styles.touchableButtonLabel}>
                                    <MaterialIcons size={30} name={menuVisible ? "expand-less" : "expand-more"} />
                                </Text>
                            </TouchableOpacity>
                        }
                        onRequestClose={hideMenu}
                        style={Styles.menuStyle}
                    >
                        <MenuItem
                            onPress={toggleVibrate}
                            textStyle={Styles.menuItemTextStyle}
                            style={Styles.menuItemStyle}
                        >
                            Turn {shouldVibrate ? 'off' : 'on'} vibration
                        </MenuItem>

                        <MenuDivider color={Colours.light_yellow} />
                        <MenuItem
                            onPress={showAbout}
                            textStyle={Styles.menuItemTextStyle}
                            style={Styles.menuItemStyle}
                        >
                            About
                        </MenuItem>
                    </Menu>
                </View>
            </SafeAreaView>

            {isFocused && <ScanCamera resultHandler={handleBarCodeScanned} />}
        </ImageBackground>
    )
}
