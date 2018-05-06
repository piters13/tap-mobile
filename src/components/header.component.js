import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../constants/colors'
import { Styles } from '../constants/styles'

export class Header extends React.Component {
  render () {
    const containerStyle = Object.assign({
      paddingBottom: 15,
      paddingTop: 40,
      width: '100%'
    }, this.props.style)

    return (
      <View style={containerStyle}>
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
  titleStyle: {
    color: Colors.Primary,
    fontSize: 27,
    fontFamily: Styles.fonts.RobotoMedium,
    paddingTop: 10
  },
  subtitleStyle: {
    fontSize: 17,
    color: Colors.TextPrimary,
    fontFamily: Styles.fonts.RobotoLight
  }
})
