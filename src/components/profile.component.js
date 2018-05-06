import React from 'react'
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import { inject, observer } from 'mobx-react'
// import { Screens } from '../constants/screens'
import { Separator } from './separator.component'
import { Colors } from '../constants/colors'
import { Styles } from '../constants/styles'
import { initPublicApp } from '../../App'

@inject('Auth') @observer
export class Profile extends React.Component {
  render () {
    return (
      <View style={{paddingTop: 10}}>
        <Text style={styles.sectionTextStyle}>Profile</Text>
        <Separator />
        <TouchableNativeFeedback onPress={() => this.logout()}>
          <View style={{padding: 5, marginTop: 10}}>
            <Text style={{fontWeight: 'bold', fontSize: 16, color: Colors.TextPrimary}}>Logout</Text>
            <Text style={styles.itemTextStyle}>{this.userInfo}</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }

  get userInfo () {
    return 'You are currently logged as ' + this.props.Auth.user.firstname + ' ' + this.props.Auth.user.lastname
  }

  logout () {
    initPublicApp()
    this.props.Auth.logout()
  }
}

const styles = StyleSheet.create({
  sectionTextStyle: {
    fontSize: 22,
    color: Colors.TextPrimary,
    fontFamily: Styles.fonts.RobotoLight,
    paddingBottom: 10
  },
  itemTextStyle: {
    fontSize: 14,
    fontFamily: Styles.fonts.RobotoLight,
    color: Colors.TextPrimary,
    paddingTop: 5
  }
})
