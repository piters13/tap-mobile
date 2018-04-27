import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { inject, observer } from 'mobx-react'
// import { Screens } from '../constants/screens'
import { Separator } from './separator.component'
import { Colors } from '../constants/colors'
import { Styles } from '../constants/styles'

@inject('Auth') @observer
export class Profile extends React.Component {
  render () {
    return (
      <View style={{paddingTop: 10}}>
        <Text style={styles.sectionTextStyle}>Profile</Text>
        <Separator />
        <TouchableOpacity style={{paddingTop: 15}} onPress={() => this.logout()}>
          <Text style={{fontWeight: 'bold', fontSize: 16, color: Colors.TextPrimary}}>Logout</Text>
          <Text style={styles.itemTextStyle}>{this.userInfo}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  get userInfo () {
    return 'You are currently logged as ' + this.props.Auth.user.firstname + ' ' + this.props.Auth.user.lastname
  }

  logout () {
    this.props.navigator.handleDeepLink({
      link: 'login',
      animated: true,
      animationType: 'slide-horizontal'
    })

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
