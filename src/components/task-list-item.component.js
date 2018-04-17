import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Badge } from 'react-native-elements'
import { Styles } from '../constants/styles'
import { Colors } from '../constants/colors'

export class TaskListItem extends React.Component {
  constructor () {
    super()
    this.state = {notes: 13, actions: 7}
  }

  render () {
    return (
      <View style={this.props.style}>
        <View>
          <Text style={styles.titleStyle}>
            {this.props.item.name}
          </Text>
          <Text style={styles.subtitleStyle}>
            {this.props.item.subtitle}
          </Text>
        </View>
        <View>
          <Badge value={this.state.notes} containerStyle={styles.firstBadgeStyle} />
          <Badge value={this.state.actions} containerStyle={styles.secondBadgeStyle} />
        </View>
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
  },
  firstBadgeStyle: {
    backgroundColor: '#3c40c6',
    width: 40,
    height: 20,
    marginBottom: 3
  },
  secondBadgeStyle: {
    backgroundColor: '#2c7dce',
    width: 40,
    height: 20
  }
})
