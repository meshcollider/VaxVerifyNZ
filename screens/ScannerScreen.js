import * as React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import ScanCamera from '../components/Camera.js'
import Styles from '../config/styles.js'

export default function ScannerScreen({ navigation }) {
    const isFocused = useIsFocused()

    const handleBarCodeScanned = ({ type, data }) => {
        navigation.navigate('ScanResult', { data: data })
    }

    return (
        <View style={Styles.container}>
            <SafeAreaView style={Styles.settingsBox}>
                <TouchableOpacity style={Styles.settingsButton} onPress={() => alert('pushed')}>
                    <Text style={Styles.buttonLabel}>
                        <MaterialCommunityIcons size={30} name="dots-vertical" />
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>

            {isFocused && <ScanCamera resultHandler={handleBarCodeScanned} />}
        </View>
    )
}
