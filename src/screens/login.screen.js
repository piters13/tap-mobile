import React from 'react'
import { Alert, Image, Keyboard, StyleSheet, Text, View } from 'react-native'
import { Button, FormInput, FormLabel, FormValidationMessage } from 'react-native-elements'
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
      email: {
        value: '',
        error: null
      },
      password: {
        value: '',
        error: null
      },
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

          <View>
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
              onChangeText={(email) => this.updateEmail(email)}
              value={this.state.email.value}
              placeholder='Please enter your email address'
              autoCapitalize='none'
              underlineColorAndroid='transparent'
            />
            <FormValidationMessage labelStyle={styles.errorMessage}>
              {this.state.email.error}
            </FormValidationMessage>

            <FormLabel fontFamily={Styles.fonts.RobotoMedium} labelStyle={styles.formLabelStyle}>Password</FormLabel>
            <FormInput secureTextEntry
              onSubmitEditing={() => {
                this.login()
              }}
              returnKeyType={'done'}
              ref={input => { this.inputs.password = input }}
              containerStyle={styles.containerInputStyle}
              inputStyle={styles.formInputStyle}
              onChangeText={(password) => this.updatePassword(password)}
              value={this.state.password.value}
              placeholder='Please enter your password'
              underlineColorAndroid='transparent'
            />

            <FormValidationMessage labelStyle={styles.errorMessage}>
              {this.state.password.error}
            </FormValidationMessage>

            <Button
              onPress={() => this.login()}
              backgroundColor={Colors.Primary}
              containerViewStyle={{marginLeft: 0, marginRight: 0, marginTop: 15}}
              fontSize={14}
              disabled={this.state.loading}
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
      </View>
    )
  }

  updateEmail (email) {
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.validateField(email, 'email', (v) => reg.test(v), 'Incorrect email address')
  }

  updatePassword (pass) {
    this.validateField(pass, 'password', (v) => v.length > 0, 'This field is required')
  }

  validateField (value, field, validateFn, error) {
    if (!validateFn(value)) {
      this.setState({[field]: {value, error}})
    } else {
      this.setState({[field]: {value, error: null}})
    }
  }

  validateForm () {
    this.validateField(this.state.password.value, 'password', (v) => v.length > 0, 'This field is required')
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.validateField(this.state.email.value, 'email', (v) => reg.test(v), 'Incorrect email address')
  }

  isFormValid () {
    return !(this.state.email.error || this.state.password.error)
  }

  login () {
    this.validateForm()

    setTimeout(() => {
      if (!this.isFormValid()) {
        return
      }
      Keyboard.dismiss()
      this.setState({loading: true})
      this.props.AuthStore.login(this.state.email.value, this.state.password.value)
        .then(() => initPrivateApp())
        .catch(err => {
          this.setState({loading: false})
          Alert.alert('Authentication error', err.message)
        })
    }, 0)
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
  },
  errorMessage: {
    fontFamily: Styles.fonts.Roboto,
    marginTop: 0,
    marginLeft: 0,
    marginBottom: 1,
    marginRight: 0,
    padding: 0
  }
})
