import React from 'react'
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { Button, FormLabel, FormInput } from 'react-native-elements'
import { inject, observer } from 'mobx-react'
import { Header } from '../components/header.component'
import { Styles } from '../constants/styles'
import { Colors } from '../constants/colors'
import { apolloClient } from '../../App'
import { gql } from 'apollo-boost'
import { Screens } from '../constants/screens'

@inject('Auth') @observer
export class CreateAccountScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
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
            onSubmitEditing={() => {
              this.inputs.lastName.focus()
            }}
            blurOnSubmit={false}
            returnKeyType={'next'}
            ref={input => { this.inputs.firstName = input }}
            containerStyle={styles.containerInputStyle}
            inputStyle={styles.formInputStyle}
            placeholder='Please enter your first name'
            onChangeText={(firstName) => this.setState({firstName})}
            value={this.state.firstName}
            underlineColorAndroid='transparent'
          />

          <FormLabel fontFamily={Styles.fonts.RobotoMedium} labelStyle={styles.formLabelStyle}>Last name</FormLabel>
          <FormInput
            onSubmitEditing={() => {
              this.inputs.email.focus()
            }}
            blurOnSubmit={false}
            returnKeyType={'next'}
            ref={input => { this.inputs.lastName = input }}
            containerStyle={styles.containerInputStyle}
            inputStyle={styles.formInputStyle}
            placeholder='Please enter your last name'
            onChangeText={(lastName) => this.setState({lastName})}
            value={this.state.lastName}
            underlineColorAndroid='transparent'
          />

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
            placeholder='Please enter your email address'
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
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
            placeholder='Please enter your password'
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            underlineColorAndroid='transparent'
          />

          <Button
            onPress={() => this.register()}
            backgroundColor={Colors.Primary}
            containerViewStyle={{marginLeft: 0, marginRight: 0, marginTop: 15}}
            fontSize={14}
            borderRadius={14}
            buttonStyle={{padding: 10}}
            title='Sign up'
            fontFamily={Styles.fonts.RobotoBold} />

          <View style={{paddingTop: 30}}>
            <Text style={styles.loginLink}
              onPress={() => this.goLogin()}>Actually, I have an account</Text>
          </View>
        </KeyboardAvoidingView>
      </View>
    )
  }

  register () {
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
    paddingBottom: 5,
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
  loginLink: {
    fontSize: 16,
    fontFamily: Styles.fonts.RobotoLight
  }
})
