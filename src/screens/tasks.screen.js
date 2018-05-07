import React from 'react'
import { StyleSheet, View } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Screens } from '../constants/screens'
import { Header } from '../components/header.component'
import { TaskList } from '../components/task-list.component'
import { Colors } from '../constants/colors'
import { Styles } from '../constants/styles'
import { Button } from 'react-native-elements'
import { apolloClient } from '../../App'
import { gql } from 'apollo-boost'

@inject('Auth') @observer
export class TasksScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      tasks: []
    }

    this.getTasks()
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, width: Styles.baseWidth}}>
          <Header title={`Tasks`} subtitle={`Updated 5 mins ago`} />
          <TaskList tasks={this.state.tasks} style={{flex: 1}} />
          <View style={{width: '100%', height: 110, justifyContent: 'center', alignItems: 'center'}}>
            <Button
              backgroundColor={Colors.Primary}
              onPress={() => this.createTask()}
              fontSize={24}
              buttonStyle={{width: 60, height: 60}}
              title='+'
              borderRadius={30}
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

  getTasks () {
    apolloClient.query({
      query: gql`query { me { tasks { id, title } } }`
    }).then(resp => this.setState({tasks: resp.data.me.tasks}))
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
