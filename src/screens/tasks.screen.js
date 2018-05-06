import React from 'react'
import { StyleSheet, View } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Screens } from '../constants/screens'
import { Header } from '../components/header.component'
import { TaskList } from '../components/task-list.component'
import { Colors } from '../constants/colors'
import { taskListMock } from '../data/task-list-mock'
import { Styles } from '../constants/styles'
import { Button } from 'react-native-elements'

@inject('Auth') @observer
export class TasksScreen extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, width: Styles.baseWidth}}>
          <Header title={`Tasks`} subtitle={`Updated 5 mins ago`} />
          <TaskList tasks={taskListMock} style={{flex: 1, marginBottom: 60}} />
          <Button
            containerViewStyle={{paddingLeft: 90, position: 'absolute', bottom: 30}}
            backgroundColor={Colors.Primary}
            onPress={() => this.createTask()}
            fontSize={24}
            buttonStyle={{width: 65, height: 65}}
            title='+'
            borderRadius={50}
            textStyle={{marginTop: -2}}
            fontFamily={Styles.fonts.RobotoBold} />
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
      },
      navigatorButtons: {},
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
