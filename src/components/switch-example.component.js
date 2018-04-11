import React from 'react'
import { View, Switch } from 'react-native'

export class SwitchExample extends React.Component {
  render () {
    return (
      <View>
        <Switch onValueChange={this.props.toggleSwitch1} value={this.props.switch1Value} />
      </View>
    )
  }
}
