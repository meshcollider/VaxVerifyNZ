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

import { BarCodeScanner } from 'expo-barcode-scanner'
import BarcodeMask from 'react-native-barcode-mask'
import { MaterialIcons } from '@expo/vector-icons'

export default function ScannerScreen({ navigation }) {
    const [hasPermission, setHasPermission] = React.useState(null)
    const [cameraType, setCameraType] = React.useState(BarCodeScanner.Constants.Type.back)

    React.useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync()
            setHasPermission(status === 'granted')
        })()
    }, [])

    const handleBarCodeScanned = ({ type, data }) => {
        //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        navigation.navigate('ScanResult', { data: data })
    }

    if (hasPermission === null) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" />
            </SafeAreaView>
        )
    }
    if (hasPermission === false) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.text}>
                    Access to camera is required to scan vaccination passport QR codes.
                </Text>
            </SafeAreaView>
        )
    }

    const windowWidth = Dimensions.get('window').width
    const w = windowWidth * 0.8

    return (
        <View style={styles.container}>
            <View style={styles.scannerBox}>
                <BarCodeScanner
                    onBarCodeScanned={handleBarCodeScanned}
                    type={cameraType}
                    barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                    style={StyleSheet.absoluteFillObject}
                >
                    <BarcodeMask
                        width={w}
                        height={w}
                        edgeColor="#ffcc00"
                        showAnimatedLine={false}
                        outerMaskOpacity={0}
                        edgeWidth={50}
                        edgeHeight={50}
                        edgeBorderWidth={10}
                        edgeRadius={100}
                    ></BarcodeMask>

                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() =>
                                setCameraType(
                                    cameraType === BarCodeScanner.Constants.Type.back
                                        ? BarCodeScanner.Constants.Type.front
                                        : BarCodeScanner.Constants.Type.back
                                )
                            }
                        >
                            <Text style={styles.buttonLabel}>
                                <MaterialIcons size={30} name="flip-camera-android" />
                            </Text>
                        </TouchableOpacity>
                    </View>
                </BarCodeScanner>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scannerBox: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    title: {
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    text: {
        textAlign: 'center',
    },
    button: {
        padding: 10,
        backgroundColor: '#FFCC00',
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
