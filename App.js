import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as ScreenOrientation from 'expo-screen-orientation'
import * as SplashScreen from 'expo-splash-screen'

import ScannerScreen from './screens/ScannerScreen'
import ResultModal from './screens/ResultModal'

ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)

export default function App() {
    const [appIsReady, setAppIsReady] = React.useState(false)
    React.useEffect(() => {
        async function prepare() {
            try {
                await SplashScreen.preventAutoHideAsync()
            } catch (e) {
                console.warn(e)
            } finally {
                setAppIsReady(true)
            }
        }
        prepare()
    }, [])
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
