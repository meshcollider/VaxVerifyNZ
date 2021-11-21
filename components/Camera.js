import * as React from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
} from 'react-native'

import { Camera } from 'expo-camera'
import { BarCodeScanner } from 'expo-barcode-scanner'
import BarcodeMask from 'react-native-barcode-mask'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'

import Styles from '../config/styles.js'
import Colours from '../config/colours.js'

export default function ScanCamera(props) {
    const [hasPermission, setHasPermission] = React.useState(null)
    const [camera, setCamera] = React.useState(null)
    const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back)
    const [flashMode, setFlashMode] = React.useState(Camera.Constants.FlashMode.off)

    const [imagePadding, setImagePadding] = React.useState(0)
    const [ratio, setRatio] = React.useState('4:3') // default is 4:3
    const { height, width } = Dimensions.get('window')
    const [isRatioSet, setIsRatioSet] = React.useState(false)

    const prepareRatio = async () => {
        let desiredRatio = '4:3'
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

    const setCameraReady = async () => {
        if (!isRatioSet) {
            await prepareRatio()
        }
    }

    const switchCamera = () => {
        setCameraType(
            cameraType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        )
        setIsRatioSet(false)
    }

    React.useEffect(() => {
        ;(async () => {
            const { status } = await Camera.requestCameraPermissionsAsync()
            setHasPermission(status === 'granted')
        })()
    }, [])

    if (hasPermission === null) {
        return (
            <View style={Styles.badgeContainer}>
                <ActivityIndicator color="white" size="large" />
            </View>
        )
    }
    if (hasPermission === false) {
        return (
            <View style={Styles.badgeContainer}>
                <Text style={Styles.cameraText}>
                    Access to camera is required to scan vaccination passport QR codes.
                </Text>
            </View>
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
            barCodeScannerSettings={{barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr]}}
            flashMode={flashMode}
            style={[
                StyleSheet.absoluteFillObject,
                { marginTop: 1.5 * imagePadding, marginBottom: 0.5 * imagePadding },
            ]}
        >
            <View style={{ flex: 1, marginBottom: height * 0.1 }}>
                <BarcodeMask
                    width={w}
                    height={w}
                    edgeColor={Colours.light_yellow}
                    showAnimatedLine={false}
                    outerMaskOpacity={0}
                    edgeWidth={50}
                    edgeHeight={50}
                    edgeBorderWidth={5}
                ></BarcodeMask>
            </View>

            <View
                style={[
                    StyleSheet.absoluteFillObject,
                    { marginTop: 1.5 * imagePadding, marginBottom: 0.5 * imagePadding },
                    {
                        flex: 1,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                    },
                ]}
            >
                <View style={Styles.buttonContainer}>
                    { cameraType === Camera.Constants.Type.back && <TouchableOpacity
                        style={[Styles.button]}
                        onPress={() =>
                            setFlashMode(
                                flashMode === Camera.Constants.FlashMode.off
                                    ? Camera.Constants.FlashMode.torch
                                    : Camera.Constants.FlashMode.off
                            )
                        }
                    >
                        <Text style={Styles.buttonLabel}>
                            <MaterialCommunityIcons
                                size={30}
                                name={
                                    flashMode === Camera.Constants.FlashMode.off
                                        ? 'lightbulb-outline'
                                        : 'lightbulb-on'
                                }
                            />
                        </Text>
                    </TouchableOpacity>
                    }
                    <TouchableOpacity
                        style={[Styles.button]}
                        onPress={switchCamera}
                    >
                        <Text style={Styles.buttonLabel}>
                            <MaterialIcons size={30} name="flip-camera-android" />
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Camera>
    )
}
