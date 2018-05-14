import React from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Header } from '../components/header.component'
import { Styles } from '../constants/styles'
import { Colors } from '../constants/colors'
import { apolloClient } from '../../App'
import { gql } from 'apollo-boost'
import { Screens } from '../constants/screens'

export class CreateAccountScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      loading: false
    }

    this.errors = {
      emailErrorMessage: '',
      emptyFirstNameMessage: '',
      emptyLastNameMessage: '',
      emptyPasswordMessage: ''
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
            value={this.state.firstName}
            underlineColorAndroid='transparent'
          />
          <FormValidationMessage labelStyle={styles.errorMessage}>
            {this.errors.emptyFirstNameMessage}
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
            value={this.state.lastName}
            underlineColorAndroid='transparent'
          />
          <FormValidationMessage labelStyle={styles.errorMessage}>
            {this.errors.emptyLastNameMessage}
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
            value={this.state.email}
            underlineColorAndroid='transparent'
          />
          <FormValidationMessage labelStyle={styles.errorMessage}>
            {this.errors.emailErrorMessage}
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
            value={this.state.password}
            underlineColorAndroid='transparent'
          />
          <FormValidationMessage labelStyle={styles.errorMessage}>
            {this.errors.emptyPasswordMessage}
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

  updateFirstName = (firstname) => {
    this.setState({firstName: firstname})
    this.validateFirstname(firstname)
  }

  validateFirstname = (firstname) => {
    if (!firstname) {
      this.errors.emptyFirstNameMessage = 'This field cannot be empty'
      this.setState({firstName: ''})
    } else {
      this.setState({firstName: firstname})
      this.errors.emptyFirstNameMessage = ''
    }
  }

  updateLastName = (lastname) => {
    this.setState({lastName: lastname})
    this.validateLastname(lastname)
  }

  validateLastname (lastname) {
    if (!lastname) {
      this.errors.emptyLastNameMessage = 'This field cannot be empty'
      this.setState({lastName: ''})
    } else {
      this.setState({lastName: lastname})
      this.errors.emptyLastNameMessage = ''
    }
  }

  updateEmail = (email) => {
    this.setState({email: email})
    this.validateEmail(email)
  }

  validateEmail (email) {
    let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!email) {
      this.errors.emailErrorMessage = 'This field cannot be empty'
      this.setState({email: ''})
    } else if (!reg.test(email)) {
      this.errors.emailErrorMessage = 'Incorrect email address'
      this.setState({email: email})
    } else {
      this.setState({email: email})
      this.errors.emailErrorMessage = ''
    }
  }

  updatePassword = (pass) => {
    this.setState({password: pass})
    this.validatePassword(pass)
  }

  validatePassword (pass) {
    if (!pass) {
      this.errors.emptyPasswordMessage = 'This field cannot be empty'
      this.setState({password: ''})
    } else {
      this.setState({password: pass})
      this.errors.emptyPasswordMessage = ''
    }
  }

  register () {
    if ((!this.errors.emptyFirstNameMessage) && (!this.errors.emptyLastNameMessage) &&
        (!this.errors.emailErrorMessage) && (!this.errors.emptyPasswordMessage)) {
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
          firstname: this.state.firstName,
          lastname: this.state.lastName,
          email: this.state.email,
          password: this.state.password
        }
      }).then(() => this.goLogin())
        .catch(() => this.setState({loading: false}))
    } else {
      Alert.alert(
        'Please fill in all required fields', '(or check if email address is valid)',
        [
          {text: 'OK', onPress: () => {}}
        ]
      )
    }
  }

  goLogin () {
    this.props.navigator.push({
      screen: Screens.Login.screen
    })
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
