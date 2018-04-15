import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../constants/colors'
import { Styles } from '../constants/styles'

export class Header extends React.Component {
  render () {
    return (
      <View style={styles.headerStyle}>
        <Text style={styles.titleStyle}>
          {this.props.title}
        </Text>
        <Text style={styles.subtitleStyle}>
          {this.props.subtitle}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    width: 250,
    paddingBottom: 15,
    paddingTop: 40
  },
  titleStyle: {
    color: Colors.Primary,
    fontSize: 27,
    fontFamily: Styles.fonts.RobotoMedium,
    paddingTop: 10
  },
  subtitleStyle: {
    fontSize: 17,
    color: Colors.TextPrimary,
    fontFamily: Styles.fonts.RobotoLight,
  }
})
