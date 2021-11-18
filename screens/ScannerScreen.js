import * as React from 'react'
import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
} from 'react-native'
import { Spinner } from 'native-base'

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
                <Spinner size="lg" />
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
            <Text style={styles.title}>Scan NZ Vaccine Pass</Text>
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
                        edgeColor="#FFCC00"
                        edgeBorderWidth={6}
                        edgeRadius={4}
                        showAnimatedLine={false}
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
        flexGrow: 1,
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
