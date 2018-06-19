import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Styles } from '../constants/styles'
import { Colors } from '../constants/colors'
import { Screens } from '../constants/screens'

export class NotesListItem extends React.Component {
  render () {
    return (
      <View style={this.props.style}>
        <TouchableOpacity onPress={() => this.showNote()}>
          <Text style={styles.titleStyle}>
            {this.props.item.title}
          </Text>
          <Text style={styles.subtitleStyle}>
            {new Date(this.props.item.createdAt).toLocaleString()}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  showNote () {
    this.props.navigator.push({
      screen: Screens.ConcreteNote.screen,
      passProps: {
        task: this.props.task,
        note: this.props.item
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
