import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Colors } from '../constants/colors'
import { Styles } from '../constants/styles'

export class ClickNotificationScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {tapped: !!(this.props && this.props.tapped)}
  }

  render () {
    return (<View style={styles.container}>
      <Text style={styles.textBold}>
        {this.state.tapped ? 'Keep up the good work!' : 'Have a nice rest!'}
      </Text>
      <Text style={styles.text}>You have just pressed the button. Action has been saved.</Text>
      <Text style={styles.textSmall}>{(new Date()).toLocaleString()}</Text>
    </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    backgroundColor: Colors.Primary
  },
  textSmall: {
    fontFamily: Styles.fonts.RobotoLight,
    color: '#fff',
    fontSize: 12
  },
  text: {
    fontFamily: Styles.fonts.RobotoLight,
    color: '#fff',
    paddingBottom: 5
  },
  textBold: {
    fontFamily: Styles.fonts.RobotoBold,
    color: '#fff',
    paddingBottom: 10
  }
})
