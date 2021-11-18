import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Switch, useColorMode, useColorModeValue } from 'native-base';

export default function OptionsScreen() {
  const { toggleColorMode } = useColorMode()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Options</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text>TODO: Front/Back camera, dark/light mode, trusted authorities/caching?</Text>
      <Text>Colour mode: {useColorModeValue("Light", "Dark")}</Text>
      <Switch size="lg" isChecked={useColorModeValue(true, false)}  onToggle={toggleColorMode} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
