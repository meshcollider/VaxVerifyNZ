import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import { Platform, StyleSheet, Text, View, ActivityIndicator } from 'react-native'

import '../config/polyfills'
import Colours from '../config/colours'

import { verifyPassURI } from '@vaxxnz/nzcp'

function ErrorMessage(props) {
    const section = props.violates.section
    const message = props.violates.message

    errorMessage = message + ' (Section: ' + section + ')'
    if (section === '4.4' || section === '4.5') {
        errorMessage = 'QR code is not a valid NZ Covid Pass'
    } else if (section === '2.1.0.3.4') {
        errorMessage = 'Covid Pass is expired'
    } else if (section === '2.1.0.3.4') {
        errorMessage = 'Covid Pass is not yet activated'
    } else if (section === '6.3' || section === '5.1.1') {
        errorMessage = 'This Covid Pass was not issued by the NZ Ministry of Health'
    }

    return (
        <>
            <Text>{errorMessage}</Text>
        </>
    )
}

function SuccessData(props) {
    const subject = props.subject
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Success</Text>
            <Text>Given name: {subject.givenName}</Text>
            <Text>Family name: {subject.familyName}</Text>
            <Text>Date of birth: {subject.dob}</Text>
        </View>
    )
}

export default function ResultModal({ route, navigation }) {
    const { data } = route.params
    const [processed, setProcessed] = React.useState(false)
    const [result, setResult] = React.useState(null)

    React.useEffect(() => {
        ;(async () => {
            const result = await verifyPassURI(data)
            setResult(result)
            setProcessed(true)
        })()
    }, [])

    if (!processed) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    if (!result.success) {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={Colours.white} barStyle="dark-content" />
                <Text style={styles.title}>Invalid Code</Text>
                <ErrorMessage violates={result.violates} data={data} />
            </View>
        )
    }

    const subject = result.credentialSubject
    return (
        <View style={styles.container}>
            <SuccessData subject={subject} />

            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        width: '90%',
        textAlign: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
})
