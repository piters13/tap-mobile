import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Header } from '../components/header.component'
import { DevicesList } from '../components/devices-list.component'
import { devicesListMock } from '../data/devices-list-mock'

export class AvailableDevicesScreen extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <Header title={`Devices around you`} subtitle={`Select device to connect`} />
        <DevicesList navigator={this.props.navigator} devices={devicesListMock} style={{width: 260, marginBottom: 110, flex: 1}} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  }
})
