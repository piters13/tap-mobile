import React from 'react'
import { StyleSheet, Switch, Text, View } from 'react-native'
import { TaskList } from '../components/task-list.component'
import { Colors } from '../constants/colors'
import { taskListMock } from '../data/task-list-mock'
import { Header } from '../components/header.component'
import { Styles } from '../constants/styles'

export class DeviceInteractionScreen extends React.Component {
  constructor () {
    super()
    this.state = {tapped: true}
  }

  get buttonLabel () {
    return this.state.tapped ? 'Working' : 'Resting'
  }

  get footerText () {
    return this.state.tapped ? 'Keep up the good work!' : 'Take your time!'
  }

  render () {
    return (
      <View style={styles.container}>
        <Header title={`You have just pressed the button!`} />
        <View style={this.state.tapped ? styles.workingSwitch : styles.restingSwitch}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 120}}>
            <Text style={{color: 'white', fontFamily: Styles.fonts.RobotoBold}}>{this.buttonLabel}</Text>
            <Switch value={this.state.tapped} onTintColor='#3280CB' thumbTintColor='#ffffff'
              tintColor='#3F3F3F' onValueChange={() => this.changeTapped()} />
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
    )
  }

  printList () {
    if (this.state.tapped) {
      return (
        <View style={{flex: 3, paddingTop: 20}}><TaskList tasks={taskListMock} style={{width: 260, flex: 1}} /></View>)
    }
  }

  changeTapped () {
    this.setState({tapped: !this.state.tapped})
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
