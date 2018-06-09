import React from 'react'
import { StyleSheet, Switch, Text, View } from 'react-native'
import { TaskList } from '../components/task-list.component'
import { Colors } from '../constants/colors'
import { Header } from '../components/header.component'
import { Styles } from '../constants/styles'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import { ActionTypes } from '../constants/action-types'

@inject('TasksStore', 'ActionsStore') @observer
export class DeviceInteractionScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      type: this.props.action.type
    }
  }

  get buttonLabel () {
    return this.state.type === ActionTypes.Working ? 'Working' : 'Resting'
  }

  get footerText () {
    return this.state.type === ActionTypes.Working ? 'Keep up the good work!' : 'Take your time!'
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, width: Styles.baseWidth}}>
          <Header title={new Date(this.props.action.createdAt).toLocaleString()} />
          <View style={{alignItems: 'center'}}>
            <View style={this.state.type === ActionTypes.Working ? styles.workingSwitch : styles.restingSwitch}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                <Text style={{color: 'white', fontFamily: Styles.fonts.RobotoBold}}>
                  {this.buttonLabel}
                </Text>
                <Switch
                  value={this.state.type === ActionTypes.Working}
                  onTintColor='#3280CB'
                  thumbTintColor='#ffffff'
                  tintColor='#3F3F3F'
                  onValueChange={() => this.changeTapped()} />
              </View>
            </View>
          </View>
          <View style={{flex: 1}}>
            {this.printList()}
            <View style={styles.footer}>
              <Text style={{fontFamily: Styles.fonts.RobotoLight, color: Colors.TextPrimary}}>
                {this.footerText}
              </Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  printList () {
    const tasks = toJS(this.props.TasksStore.tasks)

    if (this.state.type === ActionTypes.Working) {
      return (
        <View style={{flex: 4, paddingTop: 20}}>
          <TaskList navigator={this.props.navigator} tasks={tasks} style={{flex: 1}} />
        </View>)
    }
  }

  changeTapped () {
    this.props.ActionsStore.updateAction(this.props.action, {
      type: this.state.type === 0 ? 1 : 0
    }).then((a) => this.setState({type: a.type}))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  switchContainer: {
    borderRadius: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 25,
    paddingRight: 25
  },
  restingSwitch: {
    width: 170,
    borderRadius: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: '#4a637c',
    shadowColor: '#3381cd',
    shadowOffset: {
      width: 5,
      height: 3
    },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    marginBottom: 10,
    marginRight: 10,
    elevation: 5,
    position: 'relative'
  },
  workingSwitch: {
    width: 170,
    borderRadius: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: '#3f90e0',
    shadowColor: '#3381cd',
    shadowOffset: {
      width: 5,
      height: 3
    },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    marginBottom: 10,
    marginRight: 10,
    elevation: 5,
    position: 'relative'
  },
  footer: {
    paddingTop: 40,
    flex: 1,
    alignItems: 'flex-start',
    width: 250
  }
})
