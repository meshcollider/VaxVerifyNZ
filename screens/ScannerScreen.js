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
import { MaterialCommunityIcons } from '@expo/vector-icons'


import ScanCamera from '../components/Camera.js'

export default function ScannerScreen({ navigation }) {
    const isFocused = useIsFocused();

    const handleBarCodeScanned = ({ type, data }) => {
        //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        navigation.navigate('ScanResult', { data: data })
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.settingsBox}>
                <TouchableOpacity
                    style={styles.settingsButton}
                    onPress={() =>
                        alert("pushed")
                    }
                >
                    <Text style={styles.buttonLabel}>
                        <MaterialCommunityIcons size={30} name="dots-vertical" />
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>

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
    settingsBox: {
        top: 20,
        right: 5,
        position: 'absolute'
    },
    settingsButton: {
        top: 20,
        right: 5,
        padding: 10,
        alignSelf: 'flex-end',
        position: 'absolute',
        textAlign: 'center',
        borderRadius: 100,
        zIndex: 3, // works on ios
        elevation: 3, // works on android
    },
    buttonLabel: {
        color: 'white',
        textAlign: 'center',
        opacity: 1,
    },
})
