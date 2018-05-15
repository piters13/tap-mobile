import React from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { Button, FormInput, FormLabel, FormValidationMessage } from 'react-native-elements'
import { Header } from '../components/header.component'
import { Styles } from '../constants/styles'
import { Colors } from '../constants/colors'
import { apolloClient } from '../../App'
import { gql } from 'apollo-boost'

export class CreateAccountScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      firstName: {
        value: ''
      },
      lastName: {
        value: '',
      },
      email: {
        value: '',
      },
      password: {
        value: '',
      },
      loading: false
    }

    this.inputs = {
      firstName: null,
      lastName: null,
      email: null,
      password: null
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={{width: Styles.baseWidth, justifyContent: 'center'}} enabled>
          <Header style={{paddingTop: 10}} title={`Happy to have You!`} subtitle={'Simply fill the form below'} />

          <FormLabel fontFamily={Styles.fonts.RobotoMedium} labelStyle={styles.formLabelStyle}>First name</FormLabel>
          <FormInput
            onSubmitEditing={() => { this.inputs.lastName.focus() }}
            onChangeText={(text) => { this.updateFirstName(text) }}
            blurOnSubmit={false}
            returnKeyType={'next'}
            ref={input => { this.inputs.firstName = input }}
            containerStyle={styles.containerInputStyle}
            inputStyle={styles.formInputStyle}
            placeholder='Please enter your first name'
            value={this.state.firstName.value}
            underlineColorAndroid='transparent'
          />
          <FormValidationMessage labelStyle={styles.errorMessage}>
            {this.state.firstName.error}
          </FormValidationMessage>

          <FormLabel fontFamily={Styles.fonts.RobotoMedium} labelStyle={styles.formLabelStyle}>Last name</FormLabel>
          <FormInput
            onSubmitEditing={() => { this.inputs.email.focus() }}
            onChangeText={(text) => { this.updateLastName(text) }}
            blurOnSubmit={false}
            returnKeyType={'next'}
            ref={input => { this.inputs.lastName = input }}
            containerStyle={styles.containerInputStyle}
            inputStyle={styles.formInputStyle}
            placeholder='Please enter your last name'
            value={this.state.lastName.value}
            underlineColorAndroid='transparent'
          />
          <FormValidationMessage labelStyle={styles.errorMessage}>
            {this.state.lastName.error}
          </FormValidationMessage>

          <FormLabel fontFamily={Styles.fonts.RobotoMedium} labelStyle={styles.formLabelStyle}>Email</FormLabel>
          <FormInput
            keyboardType='email-address'
            blurOnSubmit={false}
            onSubmitEditing={() => this.inputs.password.focus()}
            onChangeText={(text) => { this.updateEmail(text) }}
            returnKeyType={'next'}
            ref={input => { this.inputs.email = input }}
            containerStyle={styles.containerInputStyle}
            inputStyle={styles.formInputStyle}
            placeholder='Please enter your email address'
            autoCapitalize='none'
            value={this.state.email.value}
            underlineColorAndroid='transparent'
          />
          <FormValidationMessage labelStyle={styles.errorMessage}>
            {this.state.email.error}
          </FormValidationMessage>

          <FormLabel fontFamily={Styles.fonts.RobotoMedium} labelStyle={styles.formLabelStyle}>Password</FormLabel>
          <FormInput secureTextEntry
            onSubmitEditing={() => { this.register() }}
            onChangeText={(text) => { this.updatePassword(text) }}
            returnKeyType={'done'}
            ref={input => { this.inputs.password = input }}
            containerStyle={styles.containerInputStyle}
            inputStyle={styles.formInputStyle}
            placeholder='Please enter your password'
            value={this.state.password.value}
            underlineColorAndroid='transparent'
          />
          <FormValidationMessage labelStyle={styles.errorMessage}>
            {this.state.password.error}
          </FormValidationMessage>

          <Button
            onPress={() => this.register()}
            backgroundColor={Colors.Primary}
            containerViewStyle={{marginLeft: 0, marginRight: 0, marginTop: 15}}
            fontSize={14}
            borderRadius={14}
            buttonStyle={{padding: 10}}
            title='Sign up'
            fontFamily={Styles.fonts.RobotoBold}
            disabled={this.state.loading} />

          <View style={{paddingTop: 30}}>
            <Text style={styles.loginLink}
              onPress={() => this.goLogin()}>Actually, I have an account</Text>
          </View>
        </KeyboardAvoidingView>
      </View>
    )
  }

  updateFirstName (firstname) {
    this.validateField(firstname, 'firstName', (v) => v.length > 0, 'This field is required')
  }

  updateLastName (lastname) {
    this.validateField(lastname, 'lastName', (v) => v.length > 0, 'This field is required')
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
    this.validateField(this.state.firstName.value, 'firstName', (v) => v.length > 0, 'This field is required')
    this.validateField(this.state.lastName.value, 'lastName', (v) => v.length > 0, 'This field is required')
    this.validateField(this.state.password.value, 'password', (v) => v.length > 0, 'This field is required')

    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.validateField(this.state.email.value, 'email', (v) => reg.test(v), 'Incorrect email address')
  }

  isFormValid () {
    return !(this.state.firstName.error || this.state.lastName.error || this.state.email.error || this.state.password.error)
  }

  register () {
    this.validateForm()

    setTimeout(() => {
      if (!this.isFormValid()) {
        return
      }

      this.setState({loading: true})
      Keyboard.dismiss()
      apolloClient.mutate({
        mutation: gql`
          mutation Register($firstname: String!, $lastname: String!, $email: String!, $password: String!) {
              register(user: {firstname: $firstname, lastname: $lastname, email: $email, password: $password}) {
                  id
              }
          }`,
        variables: {
          firstname: this.state.firstName.value,
          lastname: this.state.lastName.value,
          email: this.state.email.value,
          password: this.state.password.value
        }
      }).then(() => this.goLogin())
      .catch(err => {
        this.setState({loading: false})
        Alert.alert('Registration error', err.message)
      })
    }, 0)
  }

  goLogin () {
    this.props.navigator.pop()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  formInputStyle: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 5,
    paddingBottom: 0,
    width: 'auto',
    minHeight: 0,
    marginLeft: 0,
    marginRight: 0,
    color: Colors.TextPrimary,
    fontSize: 15,
    fontFamily: Styles.fonts.Roboto
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
  buttonStyle: {
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 7,
    paddingBottom: 7
  },
  errorMessage: {
    fontFamily: Styles.fonts.Roboto,
    marginTop: 0,
    marginLeft: 0,
    marginBottom: 1,
    marginRight: 0,
    padding: 0
  },
  loginLink: {
    fontSize: 16,
    fontFamily: Styles.fonts.RobotoLight
  }
})
