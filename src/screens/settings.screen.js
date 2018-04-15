import React from 'react'
import { Button, View } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Screens } from '../constants/screens'

@inject('Auth') @observer
export class SettingsScreen extends React.Component {
  render () {
    return (<View>
      <Button title="Sign out" onPress={() => this.logout()}/>
    </View>)
  }

  logout () {
    this.props.navigator.resetTo({
      screen: Screens.Login.screen,
      animated: true,
      animationType: 'slide-horizontal'
    })

    this.props.Auth.logout()
  }
}