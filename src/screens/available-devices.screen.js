import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Header } from '../components/header.component'
import { DevicesList } from '../components/devices-list.component'
import { Styles } from '../constants/styles'
import { Colors } from '../constants/colors'
import { inject, observer } from 'mobx-react'
import { Screens } from '../constants/screens'

@inject('BleStore') @observer
export class AvailableDevicesScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      bleState: null,
      scanning: false,
      devices: [],
      connecting: null
    }

    this.startScan()
  }

  componentWillUnmount () {
    if (this.state.scanning) {
      this.props.BleStore.bleManager.stopDeviceScan()
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, width: Styles.baseWidth}}>
          <Header title={`Devices around you`} subtitle={`Select device to connect`} />
          {this.getBLEError()}
          {this.state.scanning ? (<Text style={styles.stateInfo}>Scanning...</Text>) : null}
          {this.state.connecting ? (
            <Text style={styles.stateInfo}>Connecting to {this.state.connecting}...</Text>) : null}

          <DevicesList navigator={this.props.navigator}
            callbackFn={(item) => this.connectDevice(item)}
            devices={this.state.devices}
            style={{marginBottom: 70, flex: 1}} />
        </View>
      </View>
    )
  }

  getBLEError () {
    const state = this.state.bleState

    if (state === 'PoweredOn') {
      return null
    } else if (state === 'PoweredOff') {
      return (<Text style={styles.stateInfo}>{'Please enable bluetooth'}</Text>)
    } else if (state === 'Unauthorized') {
      return (<Text style={styles.stateInfo}>{'Permission to access bluetooth was not granted'}</Text>)
    } else {
      return (<Text style={styles.stateInfo}>{'Unknown bluetooth error'}</Text>)
    }
  }

  connectDevice (device) {
    if (this.state.connecting) {
      return
    }

    this.stopScan()
    this.setState({connecting: device.name})

    device.connect()
      .then((device) => device.discoverAllServicesAndCharacteristics())
      .then((device) => {
        this.props.BleStore.connect(device, (value) => {
          if (value === '1') {
            this.props.navigator.showInAppNotification({
              screen: Screens.ClickNotification.screen,
              passProps: {tapped: true},
              autoDismissTimerSec: 10
            })
          } else if (value === '2') {
            this.props.navigator.showInAppNotification({
              screen: Screens.ClickNotification.screen,
              autoDismissTimerSec: 10
            })
          }
        })

        this.props.navigator.pop()
      })
      .catch(() => {
        this.setState({connecting: null})
        this.startScan()
      })
  }

  stopScan () {
    if (this.state.scanning) {
      this.props.BleStore.bleManager.stopDeviceScan()
      this.setState({scanning: false})
    }
  }

  startScan () {
    if (this.state.scanning) {
      return
    }

    this.props.BleStore.bleManager.onStateChange((bleState) => {
      this.setState({bleState})

      if (bleState === 'PoweredOn') {
        this.setState({scanning: true})
        this.props.BleStore.bleManager.startDeviceScan(null, null, (error, device) => {
          if (error) {
            return
          }

          if (device.name === 'tap-button') {
            this.setState({devices: this.state.devices.filter(d => d.id !== device.id).concat([device])})
          }
        })

        setTimeout(() => {
          this.stopScan()
        }, 30000)
      }
    }, true)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  stateInfo: {
    fontFamily: Styles.fonts.RobotoBold,
    paddingBottom: 20,
    paddingTop: 10,
    fontSize: 16,
    color: Colors.TextPrimary
  }
})
