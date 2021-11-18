import { NavigationContainer, LightTheme, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Pressable } from 'react-native';
import { useColorModeValue, Icon } from 'native-base';


import NavBar from '../components/NavBar';

import AboutScreen from '../screens/AboutScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import ScannerScreen from '../screens/ScannerScreen';
import ScanResultScreen from '../screens/ResultModal';
import OptionsScreen from '../screens/OptionsScreen';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation() {
  
}