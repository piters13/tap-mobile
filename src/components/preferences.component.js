import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Colors } from '../constants/colors'
import { Styles } from '../constants/styles'

export class Preferences extends React.Component {
  render () {
    return (
      <View style={this.props.style}>
        <Text style={styles.sectionTextStyle}>Preferences</Text>
        <View style={{ height: 1, backgroundColor: '#c9d1d8', width: '100%' }} />
        <TouchableOpacity style={styles.itemStyle}>
          <Text style={styles.itemTextStyle}>Workday start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemStyle}>
          <Text style={styles.itemTextStyle}>Workday end</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemStyle}>
          <Text style={styles.itemTextStyle}>Ping interval</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  sectionTextStyle: {
    fontSize: 22,
    color: Colors.TextPrimary,
    fontFamily: Styles.fonts.RobotoLight
  },
  itemTextStyle: {
    fontSize: 14,
    fontFamily: Styles.fonts.RobotoLight,
    color: Colors.TextPrimary
  },
  itemStyle: {
    paddingTop: 10,
    paddingBottom: 10
  }
})
