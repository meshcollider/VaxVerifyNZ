import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Navigation from './config/navigation';

export default function App() {

  const colorModeManager = {
    get: async () => {
      try {
        let val = await AsyncStorage.getItem('@my-app-color-mode');
        return val === 'dark' ? 'dark' : 'light';
      } catch (e) {
        console.log(e);
        return 'light';
      }
    },
    set: async (value) => {
      try {
        await AsyncStorage.setItem('@my-app-color-mode', value);
      } catch (e) {
        console.log(e);
      }
    },
  };

  return (
    <SafeAreaProvider>
      <NativeBaseProvider colorModeManager={colorModeManager}> 
        <Navigation />
        <StatusBar />
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
