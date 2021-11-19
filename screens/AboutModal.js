import * as React from 'react'
import { Platform, StyleSheet, View, Text, TouchableOpacity } from 'react-native'

import Styles from '../config/styles'
import Colours from '../config/colours'

export default function AboutModal({ navigation }) {
    return (
        <View style={Styles.backgroundContainer}>
            <Text style={Styles.title}>About Vax Verify NZ</Text>
            <View style={Styles.separator} />
            <Text style={Styles.text}>
                Unofficial, open source NZ Vaccination Passport verification app.
                {'\n\n'}Developed by Samuel Dobson and Joshua Soong
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Root')} accessibilityLabel="Back to scanner">
                <Text style={[Styles.button, { fontSize: 16, paddingHorizontal: 30 }]}>Back</Text>
            </TouchableOpacity> 
        </View>
    )
}

