import React from 'react'
import { Keyboard, StyleSheet, TextInput, View } from 'react-native'
import { Button } from 'react-native-elements'
import { inject, observer } from 'mobx-react'
import { Header } from '../components/header.component'
import { Styles } from '../constants/styles'
import { Colors } from '../constants/colors'
import { initPrivateApp } from '../../App'

@inject('Auth') @observer
export class CreateAccountScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: ''
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, width: Styles.baseWidth, justifyContent: 'center'}}>

          <Header title={`Happy to have You!`} subtitle={'Simply fill the form below'} />

          <TextInput
            placeholder='First name'
            underlineColorAndroid='transparent'
            style={styles.input}
            onChangeText={(firstName) => this.setState({firstName})}
            value={this.state.firstName} />

          <TextInput
            placeholder='Last name'
            underlineColorAndroid='transparent'
            style={styles.input}
            onChangeText={(lastName) => this.setState({lastName})}
            value={this.state.lastName} />

          <TextInput
            placeholder='Email'
            keyboardType='email-address'
            underlineColorAndroid='transparent'
            style={styles.input}
            onChangeText={(username) => this.setState({username})}
            value={this.state.username} />

          <TextInput secureTextEntry
            placeholder='Password'
            underlineColorAndroid='transparent'
            style={styles.input}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password} />

          <Button
            onPress={() => this.register()}
            backgroundColor={Colors.Primary}
            containerViewStyle={{marginLeft: 0, marginRight: 0, marginTop: 25}}
            fontSize={14}
            borderRadius={14}
            buttonStyle={{padding: 10}}
            title='Sing up'
            fontFamily={Styles.fonts.RobotoBold} />
        </View>
      </View>
    )
  }

  register () {
    Keyboard.dismiss()
    initPrivateApp()
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  input: {
    backgroundColor: '#ECF0F3',
    borderWidth: 0,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 14,
    color: '#333',
    fontSize: 14,
    fontFamily: Styles.fonts.Roboto,
    marginBottom: 10
  },
  buttonStyle: {
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 7,
    paddingBottom: 7
  }
})
