import React from 'react'
import { Alert, Image, Keyboard, StyleSheet, Text, View } from 'react-native'
import { Button, FormLabel, FormInput } from 'react-native-elements'
import { inject, observer } from 'mobx-react'
import { Images } from '../constants/images'
import { Header } from '../components/header.component'
import { Styles } from '../constants/styles'
import { initPrivateApp } from '../../App'
import { Colors } from '../constants/colors'
import { Screens } from '../constants/screens'

@inject('Auth') @observer
export class LoginScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      username: 'Mary85@hotmail.com',
      password: 'Jey6JwNg'
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

          <Header title={`Why, hello there`} />

          <FormLabel fontFamily={Styles.fonts.RobotoMedium} labelStyle={styles.formLabelStyle}>Email</FormLabel>
          <FormInput
            keyboardType='email-address'
            blurOnSubmit={false}
            onSubmitEditing={() => {
              this.inputs.password.focus()
            }}
            returnKeyType={'next'}
            ref={input => { this.inputs.email = input }}
            containerStyle={styles.containerInputStyle}
            inputStyle={styles.formInputStyle}
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
            underlineColorAndroid='transparent'
          />

          <FormLabel fontFamily={Styles.fonts.RobotoMedium} labelStyle={styles.formLabelStyle}>Password</FormLabel>
          <FormInput secureTextEntry
            onSubmitEditing={() => {
              this.register()
            }}
            returnKeyType={'done'}
            ref={input => { this.inputs.password = input }}
            containerStyle={styles.containerInputStyle}
            inputStyle={styles.formInputStyle}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            underlineColorAndroid='transparent'
          />

          <Button
            onPress={() => this.login()}
            backgroundColor={Colors.Primary}
            containerViewStyle={{marginLeft: 0, marginRight: 0, marginTop: 15}}
            fontSize={14}
            borderRadius={14}
            buttonStyle={{padding: 10}}
            title='Sign in'
            fontFamily={Styles.fonts.RobotoBold} />

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
    this.props.Auth.login(this.state.username, this.state.password)
      .then(() => {
        initPrivateApp()
      }).catch(err => Alert.alert('Authentication error', err.message))
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
  formInputStyle: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 5,
    paddingBottom: 5,
    width: 'auto',
    minHeight: 0,
    marginLeft: 0,
    marginRight: 0,
    fontSize: 15,
    fontFamily: Styles.fonts.Roboto,
    color: Colors.TextPrimary
  },
  formLabelStyle: {
    fontSize: 13,
    color: Colors.TextPrimary,
    marginTop: 5,
    marginLeft: 0,
    marginBottom: 0,
    marginRight: 0,
    fontWeight: '400'
  },
  containerInputStyle: {
    marginLeft: 0,
    paddingLeft: 0,
    marginRight: 0
  },
  registerLinkContainer: {
    paddingTop: 30
  },
  registerLink: {
    fontSize: 16,
    fontFamily: Styles.fonts.RobotoLight
  }
})
