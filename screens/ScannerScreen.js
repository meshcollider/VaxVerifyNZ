import * as React from 'react'
import { View, Vibration, SafeAreaView, Text, TouchableOpacity } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';

import ScanCamera from '../components/Camera.js'
import Styles from '../config/styles.js'

export default function ScannerScreen({ navigation }) {
    const isFocused = useIsFocused()
    const [shouldVibrate, setVibrate] = React.useState(true)

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

    const handleBarCodeScanned = ({ type, data }) => {
        if (shouldVibrate) {
            Vibration.vibrate(200)
        }
        navigation.navigate('ScanResult', { data: data })
    }

    return (
        <View style={Styles.container}>
            <SafeAreaView style={Styles.settingsBox}>
                <TouchableOpacity style={Styles.settingsButton} onPress={() => toggleVibrate()}>
                    <Text style={Styles.buttonLabel}>
                        <MaterialCommunityIcons size={30} name="dots-vertical" />
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>

            {isFocused && <ScanCamera resultHandler={handleBarCodeScanned} />}
        </View>
    )
}
