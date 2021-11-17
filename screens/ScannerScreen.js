import * as React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';

import { BarCodeScanner } from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';

export default function ScannerScreen({ navigation }) {

  const [hasPermission, setHasPermission] = React.useState(null);

 React.useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    navigation.navigate('ScanResult', { 'data': data });
  };

  if (hasPermission === null) {
    return <Text>Please allow access to camera to scan vaccination passport QR codes.</Text>;
  }
  if (hasPermission === false) {
    return <Text>Access to camera is required to scan vaccination passport QR codes.</Text>;
  }

 return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan NZ Vaccine Pass</Text>
      <View style={styles.scannerBox}>
        <BarCodeScanner   onBarCodeScanned={handleBarCodeScanned}
                          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                          style={StyleSheet.absoluteFillObject}>
          <View
              style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
              }}>
          </View>
        <BarcodeMask edgeColor="#62B1F6" showAnimatedLine={false}></BarcodeMask>
        </BarCodeScanner>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerBox: {
    width: '100%',
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
