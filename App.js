import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { BleManager } from "react-native-ble-plx";

export default class App extends React.Component {
  constructor() {
    super();
    this.manager = new BleManager();
    this.device = null;

    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
          // Handle error (scanning will be stopped automatically)
          return
      }

      console.log('scanning')

      // or other criteria.
      if (device.name === 'tap-button') { 
        console.log('found');
        
    

        device.connect().then((tap) => {
          return tap.discoverAllServicesAndCharacteristics()
        }).then(tap => {
          this.manager.writeCharacteristicWithoutResponseForDevice(tap.id, 'ffe0', 'ffe1', btoa('1'))
            .then(() => console.log(sent));
        })
          
        this.manager.stopDeviceScan();
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello from Wadowice!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }

  stringToBytes(string) {
    var array = new Uint8Array(string.length);
    for (var i = 0, l = string.length; i < l; i++) {
        array[i] = string.charCodeAt(i);
     }
     return array.buffer;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
