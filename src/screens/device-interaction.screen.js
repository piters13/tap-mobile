import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import ToggleSwitch from 'toggle-switch-react-native'
// import { SwitchExample } from '../components/switch-example.component'
import { Colors } from '../constants/colors'

export class DeviceInteractionScreen extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.headerStyle}>
          <Text style={styles.headerTextStyle}>
            You have just pressed the button!
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <ToggleSwitch
            isOn={false}
            onColor='#3280CB'
            offColor='#3F3F3F'
            label='Resting'
            labelStyle={{color: 'white', fontWeight: '900'}}
            size='medium'
            onToggle={(isOn) => console.log('changed to : ', isOn)} />
        </View>
        <View style={styles.footerStyle}>
          <Text>
            Take your time!
          </Text>
        </View>
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
    width: '84%',
    paddingBottom: 30,
    paddingTop: '35%'
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
  footerStyle: {
    position: 'absolute',
    left: '8%',
    bottom: '10%'
  }
})
