import { StatusBar } from "expo-status-bar"
import * as React from "react"
import { Platform, StyleSheet, View, Text } from "react-native"

export default function AboutModal() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>About Vax Verify NZ</Text>
            <View style={styles.separator} lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />
            <Text style={styles.content}>
                Unofficial, open source NZ Vaccination Passport verification app.
                {"\n\n"}Developed by Samuel Dobson and Joshua Soong
            </Text>
            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        width: "90%",
        textAlign: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
})