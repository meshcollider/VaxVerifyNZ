/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, LightTheme, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Pressable } from 'react-native';
import { useColorModeValue, Icon } from 'native-base';

import AboutScreen from '../screens/AboutScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import ScannerScreen from '../screens/ScannerScreen';
import ScanResultScreen from '../screens/ScanResultScreen';
import OptionsScreen from '../screens/OptionsScreen';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation() {
  return (
    <NavigationContainer theme={useColorModeValue(LightTheme, DarkTheme)}
      linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="ScanResult" component={ScanResultScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {

  return (
    <BottomTab.Navigator
      initialRouteName="Scanner">
      <BottomTab.Screen
        name="Scanner"
        component={ScannerScreen}
        options={({ navigation }) => ({
          title: 'Vax Pass Scanner',
          tabBarIcon: () => <TabBarIcon name="qrcode" />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('About')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <Icon as={AntDesign}
                name="infocirlce"
                size={25}
                color={useColorModeValue("coolGray.800", "warmGray.50")}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Options"
        component={OptionsScreen}
        options={{
          title: 'Options',
          tabBarIcon: () => <TabBarIcon name="setting" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props) {
  const unfocusedColor = useColorModeValue("coolGray.800", "warmGray.50");
  return <Icon as={AntDesign} size={30} color={unfocusedColor}  style={{ marginBottom: -3 }} {...props} />;
}
