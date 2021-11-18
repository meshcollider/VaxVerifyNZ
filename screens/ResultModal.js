import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import { Platform, StyleSheet, Text, View, ActivityIndicator } from 'react-native'

import '../config/polyfills'

import { verifyPassURI } from '@vaxxnz/nzcp'

function ErrorMessage(props) {
    const section = props.violates.section
    const message = props.violates.message

    return (
        <>
            <Text>
                {section === '4.4' || section === '4.5'
                    ? 'QR code is not a valid NZ Covid Pass'
                    : message + ' (Section: ' + section + ')'}
            </Text>
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
        (async () => {
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
                <Text style={styles.title}>Invalid Code</Text>
                <ErrorMessage violates={result.violates} data={data} />
                {/* Use a light status bar on iOS to account for the black space above the modal */}
                <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
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
