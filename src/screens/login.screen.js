import React from 'react'
import { Alert, Image, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'
import { Button } from 'react-native-elements'
import { inject, observer } from 'mobx-react'
import { Images } from '../constants/images'
import { Header } from '../components/header.component'
import { Styles } from '../constants/styles'
import { initPrivateApp } from '../../App'
import { Colors } from '../constants/colors'
import { Screens } from '../constants/screens'

@inject('AuthStore') @observer
export class LoginScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      loading: false
    }

    this.inputs = {
      email: null,
      password: null
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, width: Styles.baseWidth, justifyContent: 'center'}}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image source={Images.Logo} style={styles.logo} />
          </View>

          <KeyboardAvoidingView
            style={{justifyContent: 'center'}} enabled>
            <Header title={`Why, hello there`} />

            <TextInput placeholder='Email'
              onSubmitEditing={() => {
                this.inputs.password.focus()
              }}
              blurOnSubmit={false}
              returnKeyType={'next'}
              ref={input => { this.inputs.email = input }}
              keyboardType='email-address'
              underlineColorAndroid='transparent'
              style={styles.input}
              onChangeText={(username) => this.setState({username})}
              value={this.state.username} />

            <TextInput secureTextEntry
              onSubmitEditing={() => {
                this.login()
              }}
              returnKeyType={'done'}
              ref={input => { this.inputs.password = input }}
              placeholder='Password'
              underlineColorAndroid='transparent'
              style={styles.input}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password} />

            <Button
              onPress={() => this.login()}
              backgroundColor={Colors.Primary}
              containerViewStyle={{marginLeft: 0, marginRight: 0}}
              fontSize={14}
              borderRadius={14}
              buttonStyle={{padding: 10}}
              title='Sign in'
              fontFamily={Styles.fonts.RobotoBold}
              disabled={this.state.loading} />
          </KeyboardAvoidingView>

          <View style={styles.registerLinkContainer}>
            <Text style={styles.registerLink}
              onPress={() => this.createAccount()}>You need to create account?</Text>
          </View>
        </View>
      </View>
    )
  }

  login () {
    Keyboard.dismiss()
    this.setState({loading: true})
    this.props.AuthStore.login(this.state.username, this.state.password)
      .then(() => initPrivateApp())
      .catch(err => {
        this.setState({loading: false})
        Alert.alert('Authentication error', err.message)
      })
  }

  createAccount () {
    this.props.navigator.push({
      screen: Screens.CreateAccount.screen
    })
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
    marginBottom: 10
  },
  registerLinkContainer: {
    paddingTop: 30
  },
  registerLink: {
    fontSize: 16,
    fontFamily: Styles.fonts.RobotoLight
  }
})
