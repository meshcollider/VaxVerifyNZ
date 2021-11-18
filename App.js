import React from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { NativeBaseProvider } from "native-base"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { NavigationContainer, LightTheme, DarkTheme } from "@react-navigation/native"
import { useColorModeValue, Icon } from "native-base"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import NavBar from "./components/NavBar"

import AboutModal from "./screens/AboutModal"
import ResultModal from "./screens/ResultModal"
import NotFoundScreen from "./screens/NotFoundScreen"

export default function App() {
    const colorModeManager = {
        get: async () => {
            try {
                let val = await AsyncStorage.getItem("@vaxverifynz-color-mode")
                return val === "dark" ? "dark" : "light"
            } catch (e) {
                console.log(e)
                return "light"
            }
        },
        set: async value => {
            try {
                await AsyncStorage.setItem("@vaxverifynz-color-mode", value)
            } catch (e) {
                console.log(e)
            }
        },
    }

    const Stack = createNativeStackNavigator()

    return (
        <SafeAreaProvider>
            <NativeBaseProvider colorModeManager={colorModeManager}>
                <NavigationContainer theme={useColorModeValue(LightTheme, DarkTheme)}>
                    <Stack.Navigator>
                        <Stack.Screen name='Root' component={NavBar} options={{ headerShown: false }} />
                        <Stack.Screen name='NotFound' component={NotFoundScreen} options={{ headerShown: false }} />
                        <Stack.Group screenOptions={{ presentation: "modal" }}>
                            <Stack.Screen name='About' component={AboutModal} />
                        </Stack.Group>
                        <Stack.Group screenOptions={{ presentation: "modal" }}>
                            <Stack.Screen name='ScanResult' component={ResultModal} />
                        </Stack.Group>
                    </Stack.Navigator>
                </NavigationContainer>
            </NativeBaseProvider>
        </SafeAreaProvider>
    )
}
