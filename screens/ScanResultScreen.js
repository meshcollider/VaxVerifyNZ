import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet, View, Text, ActivityIndicator } from 'react-native';

import '../config/polyfills';

import { verifyPassURI } from "@vaxxnz/nzcp";

export default function ScanResultScreen({route, navigation}) {
  const { data } = route.params;

  const [processed, setProcessed] = React.useState(false);
  const [result, setResult] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const result = await verifyPassURI(data);
      setResult(result);
      setProcessed(true);
    })();
  }, []); 

  if (!processed) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ffee" />
      </View>
    );
  }

  if (!result.success) {
    return ( 
      <View style={styles.container}>
        <Text style={styles.title}>Invalid Code</Text>
        <Text>{data}</Text>
        <Text>{JSON.stringify(result.violates)}</Text>
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </View>
    )
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Success</Text>
      <Text>{data}</Text>
      <Text>{JSON.stringify(result.credentialSubject)}</Text>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '90%',
    textAlign: 'center',
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
