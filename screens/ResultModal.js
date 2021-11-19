import * as React from 'react'
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native'
import AppLoading from 'expo-app-loading'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'

import '../config/polyfills'
import Styles from '../config/styles'
import Colours from '../config/colours'
import useFonts from '../config/useFonts'

import { verifyPassURIOffline } from '@vaxxnz/nzcp'

function ErrorMessage(props) {
    const section = props.violates.section
    const message = props.violates.message

    var errorMessage = message + ' (Section: ' + section + ')'
    if (section === '4.4' || section === '4.5') {
        errorMessage = 'This QR code is not a valid NZ COVID Pass.'
    } else if (section === '2.1.0.3.4') {
        errorMessage = 'This COVID Pass has expired.'
    } else if (section === '2.1.0.3.3') {
        errorMessage = 'This COVID Pass is not yet activated.'
    } else if (section === '6.3' || section === '5.1.1') {
        errorMessage = 'This Covid Pass was not issued by the NZ Ministry of Health.'
    } else if (section === '3' || section === '4.7') {
        errorMessage = 'This Covid Pass is malformed or has been modified.'
    }

    return (
        <>
            <Text>{errorMessage}</Text>
        </>
    )
}

export default function ResultModal({ route, navigation }) {
    const [isReady, setIsReady] = React.useState(false)
    const { data } = route.params
    const [processed, setProcessed] = React.useState(false)
    const [result, setResult] = React.useState(null)

    const LoadFonts = async () => {
        await useFonts()
    }

    React.useEffect(() => {
        ;(async () => {
            const result = await verifyPassURIOffline(data)
            setResult(result)
            setProcessed(true)
        })()
    }, [])

    if (!processed) {
        return (
            <View style={Styles.badgeContainer}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    if (!isReady) {
        return (
            <AppLoading
                startAsync={LoadFonts}
                onFinish={() => setIsReady(true)}
                onError={() => {}}
            />
        )
    }

    if (!result.success) {
        return (
            <View style={Styles.badgeContainer}>
                <View>
                <View style={Styles.errorBadge}>
                        <Text style={Styles.errorBadgeText}>
                            <MaterialCommunityIcons
                                size={30}
                                style={Styles.errorBadgeText}
                                name="eye"
                            />{' '}
                            Scan Complete
                        </Text>
                    </View>
                    <View style={Styles.errorCardBack}>
                        <View style={Styles.card}>
                            <Text style={Styles.cardTitle}>Pass Not Recognised</Text>
                            <Text style={Styles.cardText}>
                                {<Text style={Styles.bold}>Error:</Text>}
                                {'\n'}
                                {<ErrorMessage violates={result.violates} data={data} />}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={Styles.backButton}
                        onPress={() => navigation.navigate('Root')}
                    >
                        <Text style={Styles.backButtonLabel}>
                            <MaterialCommunityIcons
                                size={30}
                                style={Styles.backButtonLabel}
                                name={'arrow-left'}
                            />{' '}
                            Return
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const subject = result.credentialSubject
    return (
        <View style={Styles.badgeContainer}>
            <View>
                <View style={Styles.successBadge}>
                    <Text style={Styles.successBadgeText}>
                        <MaterialCommunityIcons
                            size={30}
                            style={Styles.successBadgeText}
                            name="eye"
                        />{' '}
                        Scan Complete
                    </Text>
                </View>
                <View style={Styles.cardBack}>
                    <View style={Styles.card}>
                        <Text style={Styles.cardTitle}>NZ Covid Pass</Text>
                        <Text style={Styles.cardText}>
                            {<Text style={Styles.bold}>Name:</Text>}
                            {'\n'}
                            {subject.givenName} {subject.familyName}
                            {'\n'}
                            {'\n'}
                            {<Text style={Styles.bold}>Date of Birth:</Text>} {subject.dob}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={Styles.backButton}
                    onPress={() => navigation.navigate('Root')}
                >
                    <Text style={Styles.backButtonLabel}>
                        <MaterialCommunityIcons
                            size={30}
                            style={Styles.backButtonLabel}
                            name={'arrow-left'}
                        />{' '}
                        Return
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
