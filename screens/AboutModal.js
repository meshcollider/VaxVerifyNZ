import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import { Platform, StyleSheet, View, Text } from 'react-native'

import Styles from '../config/styles'

export default function AboutModal() {
    return (
        <View style={Styles.container}>
            <Text style={Styles.title}>About Vax Verify NZ</Text>
            <View style={Styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <Text style={Styles.text}>
                Unofficial, open source NZ Vaccination Passport verification app.
                {'\n\n'}Developed by Samuel Dobson and Joshua Soong
            </Text>
            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    )
}

