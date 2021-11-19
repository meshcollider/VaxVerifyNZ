import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as ScreenOrientation from 'expo-screen-orientation'

import ScannerScreen from './screens/ScannerScreen'
import AboutModal from './screens/AboutModal'
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
                        component={ScannerScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Group screenOptions={{ presentation: 'modal' }}>
                        <Stack.Screen
                            name="About"
                            component={AboutModal}
                            options={{ headerShown: false }} 
                        />
                    </Stack.Group>
                    <Stack.Group screenOptions={{ presentation: 'modal' }}>
                        <Stack.Screen name="ScanResult" component={ResultModal} />
                    </Stack.Group>
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}
