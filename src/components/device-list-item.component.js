import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Styles } from '../constants/styles'
import { Colors } from '../constants/colors'

export class DevicesListItem extends React.Component {
  render () {
    return (
      <View style={this.props.style}>
        <TouchableOpacity onPress={() => this.props.callbackFn(this.props.item)}>
          <Text style={styles.titleStyle}>
            {this.props.item.name}
          </Text>
          <Text style={styles.subtitleStyle}>
            Signal strength: {this.getSignalStrength()}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  getSignalStrength () {
    if (this.props.item.rssi > -40) {
      return 'Awesome'
    } else if (this.props.item.rssi > -70) {
      return 'Good'
    } else if (this.props.item.rssi > -80) {
      return 'Usable'
    } else {
      return 'Pathetic'
    }
  }
}

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 22,
    color: Colors.TextPrimary,
    fontFamily: Styles.fonts.RobotoLight
  },
  subtitleStyle: {
    fontSize: 13,
    color: Colors.TextPrimary,
    fontFamily: Styles.fonts.RobotoLight
  }
})
