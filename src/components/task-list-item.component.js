import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Badge } from 'react-native-elements'
import { Styles } from '../constants/styles'
import { Colors } from '../constants/colors'
import { randomInt } from '../utils/random'
import { Screens } from '../constants/screens'

export class TaskListItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {notes: randomInt(0, 10), actions: randomInt(0, 40)}
  }

  render () {
    return (
      <TouchableOpacity onPress={() => this.showTask()}>
        <View style={this.props.style}>
          <View>
            <Text numberOfLines={1} style={styles.titleStyle}>
              {this.props.item.title}
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
      </TouchableOpacity>
    )
  }

  showTask = () => {
    return (
      this.props.navigator.push({
        screen: Screens.ConcreteTask.screen,
        passProps: {
          title: this.props.item.title,
          notes: this.state.notes,
          actions: this.state.actions
        }
      })
    )
  }
}

const styles = StyleSheet.create({
  titleStyle: {
    flex: 1,
    maxWidth: 200,
    fontSize: 22,
    paddingTop: 5,
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
