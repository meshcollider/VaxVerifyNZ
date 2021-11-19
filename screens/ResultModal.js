import * as React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'

import '../config/polyfills'
import Colours from '../config/colours'

import { verifyPassURI } from '@vaxxnz/nzcp'

function ErrorMessage(props) {
    const section = props.violates.section
    const message = props.violates.message

    errorMessage = message + ' (Section: ' + section + ')'
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

function SuccessData(props) {
    const subject = props.subject
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Success</Text>
                <Text>
                    Name: {subject.givenName} {subject.familyName}
                </Text>
                <Text>Date of birth: {subject.dob}</Text>
            </View>
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
                <Text style={styles.title}>Invalid Code</Text>
                <ErrorMessage violates={result.violates} data={data} />
            </View>
        )
    }

    const subject = result.credentialSubject
    return (
        <View style={styles.container}>
            <SuccessData subject={subject} />
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
