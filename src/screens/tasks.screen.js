import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Screens } from '../constants/screens'
import { Header } from '../components/header.component'
import { TaskList } from '../components/task-list.component'
import { Colors } from '../constants/colors'
import { Styles } from '../constants/styles'
import { Button } from 'react-native-elements'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'

@inject('TasksStore') @observer
export class TasksScreen extends React.Component {
  constructor (props) {
    super(props)

    this.props.TasksStore.fetchTasks()
  }

  render () {
    const tasks = toJS(this.props.TasksStore.tasks)

    return (
      <View style={styles.container}>
        <View style={{flex: 1, width: Styles.baseWidth}}>
          <Header title={`Tasks`} subtitle={`Updated 5 mins ago`} />
          <TaskList tasks={tasks} style={{flex: 1, marginBottom: 70}} />
          <View
            style={{position: 'absolute', width: '100%', bottom: 20, height: 65, alignItems: 'center', justifyContent: 'center'}}>
            <Button
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
