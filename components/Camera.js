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

import { Camera } from 'expo-camera'
import { BarCodeScanner } from 'expo-barcode-scanner'
import BarcodeMask from 'react-native-barcode-mask'
import { MaterialIcons } from '@expo/vector-icons'

export default function ScanCamera(props) {
    const [hasPermission, setHasPermission] = React.useState(null)
    const [camera, setCamera] = React.useState(null)
    const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back)

    // Screen Ratio and image padding
    const [imagePadding, setImagePadding] = React.useState(0)
    const [ratio, setRatio] = React.useState('4:3') // default is 4:3
    const { height, width } = Dimensions.get('window')
    const screenRatio = height / width
    const [isRatioSet, setIsRatioSet] = React.useState(false)

    // set the camera ratio and padding.
    // this code assumes a portrait mode screen
    const prepareRatio = async () => {
        let desiredRatio = '4:3' // Start with the system default
        // This issue only affects Android
        if (Platform.OS === 'android') {
            const ratios = await camera.getSupportedRatiosAsync()
            let distances = {}
            let realRatios = {}
            let minDistance = null
            for (const ratio of ratios) {
                const parts = ratio.split(':')
                const realRatio = parseInt(parts[0]) / parseInt(parts[1])
                realRatios[ratio] = realRatio
                const effectiveHeight = realRatio * width
                const heightDiff = Math.abs(height - effectiveHeight)
                distances[ratio] = heightDiff
                if (minDistance == null) {
                    minDistance = ratio
                } else {
                    if (heightDiff < distances[minDistance]) {
                        minDistance = ratio
                    }
                }
            }
            desiredRatio = minDistance
            const remainder = Math.floor((height - realRatios[desiredRatio] * width) / 2)
            setImagePadding(remainder)
            setRatio(desiredRatio)
            setIsRatioSet(true)
        }
    }

    // the camera must be loaded in order to access the supported ratios
    const setCameraReady = async () => {
        if (!isRatioSet) {
            await prepareRatio()
        }
    }

    React.useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync()
            setHasPermission(status === 'granted')
        })()
    }, [])


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

    const w = width * 0.7

    return (
            <Camera
                onCameraReady={setCameraReady}
                ratio={ratio}
                ref={ref => {
                    setCamera(ref)
                }}
                onBarCodeScanned={props.resultHandler}
                type={cameraType}
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                //useCamera2Api={true}
                style={[StyleSheet.absoluteFillObject, { marginTop: 1.5*imagePadding, marginBottom: 0.5*imagePadding }]}
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
                                cameraType === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            )
                        }
                    >
                        <Text style={styles.buttonLabel}>
                            <MaterialIcons size={30} name="flip-camera-android" />
                        </Text>
                    </TouchableOpacity>
                </View>
            </Camera>
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
