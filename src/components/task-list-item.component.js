import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Badge } from 'react-native-elements'
import { Styles } from '../constants/styles'
import { Colors } from '../constants/colors'
import { randomInt } from '../utils/random'

export class TaskListItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {notes: randomInt(0, 10), actions: randomInt(0, 40)}
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
          <Badge value={this.state.notes} containerStyle={styles.firstBadgeStyle} textStyle={styles.badgeTextStyle} />
          <Badge value={this.state.actions} containerStyle={styles.secondBadgeStyle} textStyle={styles.badgeTextStyle} />
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
    borderRadius: 6,
    width: 37,
    height: 20,
    marginBottom: 3,
    paddingLeft: 5,
    paddingRight: 5
  },
  secondBadgeStyle: {
    backgroundColor: '#2c7dce',
    borderRadius: 6,
    width: 37,
    height: 20,
    paddingLeft: 5,
    paddingRight: 5
  },
  badgeTextStyle: {
    fontFamily: Styles.fonts.RobotoBlack,
    fontSize: 12
  }
})
