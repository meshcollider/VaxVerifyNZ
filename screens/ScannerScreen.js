import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import ScanCamera from '../components/Camera.js'
import Styles from '../config/styles.js'

export default function ScannerScreen({ navigation }) {
    const isFocused = useIsFocused()

    const handleBarCodeScanned = ({ type, data }) => {
        navigation.navigate('ScanResult', { data: data })
    }

    return (
        <View style={Styles.container}>
            {isFocused && <ScanCamera resultHandler={handleBarCodeScanned} />}
        </View>
    )
}
