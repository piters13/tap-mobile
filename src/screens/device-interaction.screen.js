import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { SwitchExample } from '../components/switch-example.component'
import { Colors } from '../constants/colors'

export class DeviceInteractionScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      switch1Value: false
    }
  }

  toggleSwitch1 = (value) => {
    this.setState({switch1Value: value})
    console.log('Switch 1 is: ' + value)
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.headerStyle}>
          <Text style={styles.headerTextStyle}>
            You have just pressed the button!
          </Text>
        </View>
        <SwitchExample
          toggleSwitch1={this.toggleSwitch1}
          switch1Value={this.state.switch1Value} />
      </View>
    )
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
    width: 300,
    paddingBottom: 15,
    paddingTop: '35%'
  },
  headerTextStyle: {
    textAlign: 'left',
    color: Colors.Main,
    fontSize: 33,
    fontWeight: 'bold',
    fontFamily: 'Arial, Helvetica, sansSerif',
    paddingTop: 10
  }
})
