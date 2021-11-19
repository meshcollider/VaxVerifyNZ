import * as React from 'react'
import { View, Vibration, SafeAreaView, Text, TouchableOpacity } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';

import ScanCamera from '../components/Camera.js'
import Styles from '../config/styles.js'

export default function ScannerScreen({ navigation }) {
    const isFocused = useIsFocused()
    const [shouldVibrate, setVibrate] = React.useState(true)
    const [menuVisible, setMenuVisible] = React.useState(false)

    React.useEffect(() => {
        ;(async () => {
            const value = await AsyncStorage.getItem('@vaxverifynz-vibrate')
            setVibrate(value === 'true')
        })()
    }, [])

    const toggleVibrate = async () => {
        setVibrate(!shouldVibrate)
        await AsyncStorage.setItem('@vaxverifynz-vibrate', JSON.stringify(shouldVibrate))
    }


    const hideMenu = () => setMenuVisible(false);
    const showMenu = () => setMenuVisible(true);

    const handleBarCodeScanned = ({ type, data }) => {
        if (shouldVibrate) {
            Vibration.vibrate(200)
        }
        navigation.navigate('ScanResult', { data: data })
    }

    const showAbout = () => {
        navigation.navigate('About')
    }

    return (
        <View style={Styles.container}>
            <SafeAreaView style={Styles.settingsBox}>
                <View style={Styles.settingsButton}>
                <Menu
                    visible={menuVisible}
                    anchor={
                            <Text onPress={showMenu} style={Styles.buttonLabel}>
                                <MaterialCommunityIcons size={30} name="dots-vertical" />
                            </Text>
                    }
                    onRequestClose={hideMenu}
                >
                    <MenuItem onPress={toggleVibrate}>Turn {shouldVibrate ? 'off' : 'on'} vibration</MenuItem>
                    <MenuDivider />
                    <MenuItem onPress={showAbout}>About</MenuItem>
                </Menu>
                </View>
            </SafeAreaView>

            {isFocused && <ScanCamera resultHandler={handleBarCodeScanned} />}
        </View>
    )
}
