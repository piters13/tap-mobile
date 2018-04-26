import React from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { Separator } from './separator.component'
import { Colors } from '../constants/colors'
import { Styles } from '../constants/styles'

export class Device extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      connectionState: 'DETACH',
      deviceInfo: 'I am connected!'
    }
  }

  render () {
    return (
      <View style={{paddingTop: 5}}>
        <Text style={styles.sectionTextStyle}>Device</Text>
        <Separator />
        <View style={styles.itemStyle}>
          <Text style={styles.itemTextStyle}>{this.state.deviceInfo}</Text>
          <Button transparent
            onPress={
              this.state.connectionState === 'DETACH'
                ? () => this.showDetachAlert()
                : () => this.showAttachAlert()}
            containerViewStyle={{marginLeft: 0, marginRight: 0}}
            buttonStyle={{borderRadius: 5, paddingLeft: 12, paddingRight: 12, paddingTop: 7, paddingBottom: 7}}
            color={Colors.TextPrimary}
            rounded
            title={this.state.connectionState} />
        </View>
      </View>
    )
  }

  showDetachAlert = () => {
    Alert.alert(
      'Are you sure you want to detach the device?', '',
      [
        {text: 'Yes', onPress: () => this.setState({connectionState: 'ATTACH', deviceInfo: 'Any device connected'})},
        {text: 'No', onPress: () => {}, style: 'cancel'}
      ],
      { cancelable: false }
    )
  }

  showAttachAlert = () => {
    Alert.alert(
      'Are you sure you want to attach the device?', '',
      [
        {text: 'Yes', onPress: () => this.setState({connectionState: 'DETACH', deviceInfo: 'I am connected!'})},
        {text: 'No', onPress: () => {}, style: 'cancel'}
      ],
      { cancelable: false }
    )
  }
}

const styles = StyleSheet.create({
  sectionTextStyle: {
    fontSize: 22,
    color: Colors.TextPrimary,
    fontFamily: Styles.fonts.RobotoLight
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
