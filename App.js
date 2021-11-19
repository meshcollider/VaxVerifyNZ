import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as ScreenOrientation from 'expo-screen-orientation'

import ScannerScreen from './screens/ScannerScreen'
import ResultModal from './screens/ResultModal'

ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)

export default function App() {
    const Stack = createNativeStackNavigator()

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Root"
                        options={{ headerShown: false }}
                        component={ScannerScreen}
                    />
                    <Stack.Screen
                        name="ScanResult"
                        options={{ headerShown: false, presentation: 'modal' }}
                        component={ResultModal}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}
