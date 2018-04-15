import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Styles } from '../constants/styles'
import { Colors } from '../constants/colors'

export class TaskListItem extends React.Component {
  render () {
    return (
      <View style={this.props.style}>
        <Text style={styles.titleStyle}>
          {this.props.item.name}
        </Text>
        <Text style={styles.subtitleStyle}>
          {this.props.item.subtitle}
        </Text>
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