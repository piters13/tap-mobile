import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Styles } from '../constants/styles'
import { Colors } from '../constants/colors'
import { Screens } from '../constants/screens'
import { ActionTypes } from '../constants/action-types'

export class ActionListItem extends React.Component {
  render () {
    return (
      <View style={this.props.style}>
        <TouchableOpacity onPress={() => this.modifyAction()}>
          <Text style={styles.titleStyle}>
            {this.props.item.type === ActionTypes.Working ? 'Working' : 'Resting'}
          </Text>
          <Text style={styles.subtitleStyle}>
            {new Date(this.props.item.createdAt).toLocaleString()} {(this.props.item.task) ? `, connected with: ${this.props.item.task.title}` : ''}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  modifyAction () {
    this.props.navigator.showLightBox({
      screen: Screens.DeviceInteraction.screen,
      props: {
        action: this.props.item
      }
    })
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
