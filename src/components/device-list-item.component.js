import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Styles } from '../constants/styles'
import { Colors } from '../constants/colors'

export class DevicesListItem extends React.Component {
  render () {
    return (
      <View style={this.props.style}>
        <TouchableOpacity onPress={() => this.props.navigator.pop({})}>
          <Text style={styles.titleStyle}>
            {this.props.item.label}
          </Text>
          <Text style={styles.subtitleStyle}>
            Distance: {this.props.item.subtitle}
          </Text>
        </TouchableOpacity>
      </View>
    )
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
