import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { inject, observer } from 'mobx-react'
// import { Screens } from '../constants/screens'
import { Colors } from '../constants/colors'
import { Styles } from '../constants/styles'

@inject('Auth') @observer
export class Profile extends React.Component {
  render () {
    return (
      <View style={this.props.style}>
        <Text style={styles.sectionTextStyle}>Profile</Text>
        <View style={{ height: 1, backgroundColor: '#c9d1d8' }} />
        <TouchableOpacity style={{paddingTop: 10}} onPress={() => this.logout()}>
          <Text style={{fontWeight: 'bold'}}>Logout</Text>
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
    fontFamily: Styles.fonts.RobotoLight
  },
  itemTextStyle: {
    fontSize: 14,
    fontFamily: Styles.fonts.RobotoLight,
    color: Colors.TextPrimary
  }
})
