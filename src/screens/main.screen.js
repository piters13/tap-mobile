import React from 'react'
import { StyleSheet, View } from 'react-native'
import ActionButton from 'react-native-action-button'
import { inject, observer } from 'mobx-react'
import { Screens } from '../constants/screens'
import { Header } from '../components/header.component'
import { TaskList } from '../components/task-list.component'
import { Colors } from '../constants/colors'

@inject('Auth') @observer
export class MainScreen extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <Header />
        <TaskList style={{height: 100}} />
        <ActionButton position='center' buttonColor={Colors.Main} onPress={() => this.logout()} />
      </View>
    )
  }

  logout () {
    this.props.navigator.resetTo({
      screen: Screens.Login.screen
    })

    this.props.Auth.logout()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  }
})
