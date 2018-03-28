import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { BleManager } from "react-native-ble-plx";

export default class App extends React.Component {
  constructor() {
    super();
    this.manager = new BleManager();
    this.tap = null;

    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
          // Handle error (scanning will be stopped automatically)
          return
      }

      console.log('found device');

      // or other criteria.
      if (device.name === 'tap-button') { 
        console.log('found');

        device.connect().then((tap) => {
          return tap.discoverAllServicesAndCharacteristics()
        }).then(tap => {
          this.tap = tap;
          console.log('ready');
        });
          
        this.manager.stopDeviceScan();
      }
    });

    setTimeout(() => {
      console.log('stop scan');
      this.manager.stopDeviceScan();
    }, 10000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello from Wadowice!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Button onPress={this.ping.bind(this)} title="Ping device"/>
      </View>
    );
  }

  ping() {
    if (this.tap) {
      console.log('sending ping to', this.tap.id);
      this.manager.writeCharacteristicWithoutResponseForDevice(this.tap.id, 'ffe0', 'ffe1', btoa('1'));
    }
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
