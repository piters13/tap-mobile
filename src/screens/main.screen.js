import React from 'react'
import { StyleSheet, View } from 'react-native'
import ActionButton from 'react-native-action-button'
import { inject, observer } from 'mobx-react'
import { Screens } from '../constants/screens'
import { Header } from '../components/header.component'
import { TaskList } from '../components/task-list.component'
import { Colors } from '../constants/colors'
import { taskListMock } from '../data/task-list-mock'

@inject('Auth') @observer
export class MainScreen extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <Header title={`Tasks`} subtitle={`Updated 5 mins ago`} />
        <TaskList tasks={taskListMock} style={{width: 260, flex: 1}} />
        <View style={{width: '100%', height: 110}}>
          <ActionButton position='center' buttonColor={Colors.Primary} onPress={() => this.createTask()} />
        </View>
      </View>
    )
  }

  createTask () {
    this.props.navigator.showModal({
      screen: Screens.CreateTask.screen,
      passProps: {},
      navigatorStyle: {
        navBarTranslucent: true,
        navBarTransparent: true
      }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
      navigatorButtons: {}, // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
      animationType: 'slide-horizontal'
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  }
})
