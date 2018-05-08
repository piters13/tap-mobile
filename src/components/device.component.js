import React from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { Separator } from './separator.component'
import { Colors } from '../constants/colors'
import { Styles } from '../constants/styles'
import { Screens } from '../constants/screens'
import { ConnectionState } from '../constants/enums/connection-state'

export class Device extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      connectionState: ConnectionState.Detached
    }
  }

  render () {
    return (
      <View style={{paddingTop: 5}}>
        <Text style={styles.sectionTextStyle}>Device</Text>
        <Separator />
        {this.createDeviceAttachmentSetting()}
      </View>
    )
  }

  createDeviceAttachmentSetting = () => {
    const buttonTitle = this.state.connectionState === ConnectionState.Detached ? 'DETACH' : 'SCAN'
    const deviceInfo = this.state.connectionState === ConnectionState.Detached ? 'I am connected!' : 'No device connected'
    return (
      <View style={styles.itemStyle}>
        <Text style={styles.itemTextStyle}>{deviceInfo}</Text>
        <Button transparent
          onPress={this.toggleDeviceConnection()}
          containerViewStyle={{marginLeft: 0, marginRight: 0}}
          buttonStyle={{borderRadius: 5, paddingLeft: 12, paddingRight: 12, paddingTop: 7, paddingBottom: 7}}
          color={Colors.TextPrimary}
          rounded
          title={buttonTitle} />
      </View>
    )
  }

  toggleDeviceConnection = () => {
    return (
      this.state.connectionState === ConnectionState.Detached
        ? () => this.detachDevice()
        : () => this.attachDevice()
    )
  }

  detachDevice = () => {
    Alert.alert(
      'Are you sure you want to detach the device?', '',
      [
        {text: 'Yes', onPress: () => this.setState({connectionState: ConnectionState.Attached})},
        {text: 'No', onPress: () => {}, style: 'cancel'}
      ]
    )
  }

  attachDevice = () => {
    return (
      this.props.navigator.push({
        screen: Screens.AvailableDevices.screen
      })
    )
  }
}

const styles = StyleSheet.create({
  sectionTextStyle: {
    fontSize: 22,
    color: Colors.TextPrimary,
    fontFamily: Styles.fonts.RobotoLight,
    paddingBottom: 10
  },
  itemStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemTextStyle: {
    fontSize: 14,
    fontFamily: Styles.fonts.RobotoLight,
    color: Colors.TextPrimary
  }
})
