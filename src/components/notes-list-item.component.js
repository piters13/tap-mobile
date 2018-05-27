import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Styles } from '../constants/styles'
import { Colors } from '../constants/colors'

export class NotesListItem extends React.Component {
  render () {
    return (
      <View style={this.props.style}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.titleStyle}>
            {this.props.item.label}
          </Text>
          <Text style={styles.subtitleStyle}>
            {this.props.item.subtitle}
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
