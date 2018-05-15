import React from 'react'
import { Alert, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Separator } from './separator.component'
import { Colors } from '../constants/colors'
import { Styles } from '../constants/styles'
import { initPublicApp } from '../../App'

@inject('AuthStore') @observer
export class Profile extends React.Component {
  render () {
    return (
      <View style={{paddingTop: 10}}>
        <Text style={styles.sectionTextStyle}>Profile</Text>
        <Separator />
        <TouchableNativeFeedback onPress={() => this.logout()}>
          <View style={{
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 5,
            paddingBottom: 5,
            marginTop: 10,
            borderLeftWidth: 3,
            borderLeftColor: '#bdc3c7'
          }}>
            <Text style={{fontWeight: 'bold', fontSize: 16, color: Colors.TextPrimary}}>Logout</Text>
            <Text style={styles.itemTextStyle}>{this.userInfo}</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }

  get userInfo () {
    return 'You are currently logged as ' + this.props.AuthStore.user.firstname + ' ' +
      this.props.AuthStore.user.lastname
  }

  logout () {
    Alert.alert(
      'Are you sure you want to logout?', '',
      [
        {
          text: 'Yes', onPress: () => {
            initPublicApp()
            this.props.AuthStore.logout()
          }
        },
        {text: 'No', onPress: () => {}, style: 'cancel'}
      ]
    )
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
