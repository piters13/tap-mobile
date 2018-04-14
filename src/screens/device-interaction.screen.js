import React from 'react'
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native'
import ToggleSwitch from 'toggle-switch-react-native'
import { TaskList } from '../components/task-list.component'
import { Colors } from '../constants/colors'

export class DeviceInteractionScreen extends React.Component {
  constructor () {
    super()
    this.state = {showList: false}
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.headerStyle}>
          <Text style={styles.headerTextStyle}>
            You have just pressed the button!
          </Text>
        </View>
        <TouchableHighlight style={this.state.showList ? styles.buttonPress : styles.buttonContainer} onPress={() => this.printList()}>
          <ToggleSwitch
            isOn={false}
            onColor='#3280CB'
            offColor='#3F3F3F'
            label={this.state.showList ? 'Working' : 'Resting'}
            labelStyle={{color: 'white', fontWeight: '900'}}
            size='medium'
            onToggle={() => this.printList()} />
        </TouchableHighlight>
        {this.state.showList && <View style={{height: '70%', paddingTop: '4%'}}><TaskList /></View> }
        <View style={styles.footerStyle}>
          <Text>
            {this.state.showList ? 'Keep up the good work!' : 'Take your time!'}
          </Text>
        </View>
      </View>
    )
  }

  printList = () => {
    this.setState({showList: !this.state.showList})
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
  headerStyle: {
    width: '84%',
    paddingBottom: '4%',
    paddingTop: '12%'
  },
  headerTextStyle: {
    textAlign: 'left',
    color: Colors.Main,
    fontSize: 33,
    fontWeight: 'bold',
    fontFamily: 'Arial, Helvetica, sansSerif',
    paddingTop: 10
  },
  buttonContainer: {
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
  buttonPress: {
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
  footerStyle: {
    position: 'absolute',
    left: '8%',
    bottom: '10%'
  }
})
