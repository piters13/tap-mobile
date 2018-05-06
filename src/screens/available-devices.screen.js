import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Header } from '../components/header.component'
import { DevicesList } from '../components/devices-list.component'
import { devicesListMock } from '../data/devices-list-mock'
import { Styles } from '../constants/styles'

export class AvailableDevicesScreen extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, width: Styles.baseWidth}}>
          <Header title={`Devices around you`} subtitle={`Select device to connect`} />
          <DevicesList navigator={this.props.navigator} devices={devicesListMock} style={{marginBottom: 110, flex: 1}} />
        </View>
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
