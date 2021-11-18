import * as React from 'react'
import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
} from 'react-native'
import { useIsFocused } from '@react-navigation/native';

import ScanCamera from '../components/Camera.js'

export default function ScannerScreen({ navigation }) {
    const isFocused = useIsFocused();

    const handleBarCodeScanned = ({ type, data }) => {
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
        marginVertical: 40,
        marginHorizontal: Dimensions.get('window').width * 0.15,
        textAlign: 'center',
        borderRadius: 150,
        shadowColor: 'black',
        shadowRadius: 40,
        elevation: 3,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
    },
    buttonLabel: {
        color: 'white',
        textAlign: 'center',
    },
})
