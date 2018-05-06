import React from 'react'
import { Alert, Button, Image, Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Images } from '../constants/images'
import { Screens } from '../constants/screens'
import { Header } from '../components/header.component'
import { Styles } from '../constants/styles'

@inject('Auth') @observer
export class LoginScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      username: 'Mary85@hotmail.com',
      password: 'Jey6JwNg'
    }

    this.props.navigator.toggleTabs({
      to: 'hidden',
      animated: false
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, width: Styles.baseWidth, justifyContent: 'center'}}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image source={Images.Logo} style={styles.logo} />
          </View>

          <Header title={`Why, hello there`} />

          <TextInput placeholder='Email'
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

          <Button onPress={() => this.login()} title='Sign in' />

          <View style={styles.registerLinkContainer}>
            <Text style={styles.registerLink}
              onPress={() => Alert.alert('Error', 'Not implemented')}>You need to create account?</Text>
          </View>
        </View>
      </View>
    )
  }

  login () {
    Keyboard.dismiss()
    this.props.Auth.login(this.state.username, this.state.password)
      .then(() => {
        this.props.navigator.resetTo({
          screen: Screens.Main.screen,
          animated: true,
          animationType: 'slide-horizontal'
        })
      }).catch(err => Alert.alert('Authentication error', err.message))
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  logo: {
    resizeMode: 'contain',
    height: 120
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
    marginBottom: 10,
  },
  registerLinkContainer: {
    paddingTop: 30
  },
  registerLink: {
    fontSize: 16,
    fontFamily: Styles.fonts.RobotoLight
  }
})
