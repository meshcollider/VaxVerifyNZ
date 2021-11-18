import { AntDesign } from "@expo/vector-icons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import * as React from "react"
import { Pressable } from "react-native"
import { useColorModeValue, Icon } from "native-base"

import ScannerScreen from "../screens/ScannerScreen"
import OptionsScreen from "../screens/OptionsScreen"

const BottomTab = createBottomTabNavigator()

function NavBar() {
    return (
        <BottomTab.Navigator initialRouteName='Scanner'>
            <BottomTab.Screen
                name='Scanner'
                component={ScannerScreen}
                options={({ navigation }) => ({
                    title: "Vax Pass Scanner",
                    tabBarIcon: () => <TabBarIcon name='qrcode' />,
                    headerRight: () => (
                        <Pressable
                            onPress={() => navigation.navigate("About")}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}
                        >
                            <Icon
                                as={AntDesign}
                                name='infocirlce'
                                size={25}
                                color={useColorModeValue("coolGray.800", "warmGray.50")}
                                style={{ marginRight: 15 }}
                            />
                        </Pressable>
                    ),
                })}
            />
            <BottomTab.Screen
                name='Options'
                component={OptionsScreen}
                options={{
                    title: "Options",
                    tabBarIcon: () => <TabBarIcon name='setting' />,
                }}
            />
        </BottomTab.Navigator>
    )
}

export default NavBar

function TabBarIcon(props) {
    const unfocusedColor = useColorModeValue("coolGray.800", "warmGray.50")
    return <Icon as={AntDesign} size={30} color={unfocusedColor} style={{ marginBottom: -3 }} {...props} />
}
