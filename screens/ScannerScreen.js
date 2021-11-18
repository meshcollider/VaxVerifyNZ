import * as React from 'react'
import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
} from 'react-native'
import { useIsFocused } from '@react-navigation/native';

import ScanCamera from '../components/Camera.js'

export default function ScannerScreen({ navigation }) {
    const isFocused = useIsFocused();

    const handleBarCodeScanned = ({ type, data }) => {
        //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        navigation.navigate('ScanResult', { data: data })
    }

    return (
        <View style={styles.container}>
            {isFocused && <ScanCamera resultHandler={handleBarCodeScanned}  />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffcc00',
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
    },
    button: {
        padding: 10,
        backgroundColor: '#ffcc00',
        alignSelf: 'flex-end',
        margin: 20,
        textAlign: 'center',
        borderRadius: 100,
    },
    buttonLabel: {
        color: 'white',
        textAlign: 'center',
    },
})
