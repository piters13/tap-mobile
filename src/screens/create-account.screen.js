import React from 'react'
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'
import { Button } from 'react-native-elements'
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
          <Header title={`Happy to have You!`} subtitle={'Simply fill the form below'} />

          <TextInput
            placeholder='First name'
            onSubmitEditing={() => {
              this.inputs.lastName.focus()
            }}
            blurOnSubmit={false}
            returnKeyType={'next'}
            ref={input => { this.inputs.firstName = input }}
            underlineColorAndroid='transparent'
            style={styles.input}
            onChangeText={(firstName) => this.setState({firstName})}
            value={this.state.firstName} />

          <TextInput
            placeholder='Last name'
            onSubmitEditing={() => {
              this.inputs.email.focus()
            }}
            blurOnSubmit={false}
            returnKeyType={'next'}
            ref={input => { this.inputs.lastName = input }}
            underlineColorAndroid='transparent'
            style={styles.input}
            onChangeText={(lastName) => this.setState({lastName})}
            value={this.state.lastName} />

          <TextInput
            placeholder='Email'
            keyboardType='email-address'
            blurOnSubmit={false}
            onSubmitEditing={() => {
              this.inputs.password.focus()
            }}
            returnKeyType={'next'}
            ref={input => { this.inputs.email = input }}
            underlineColorAndroid='transparent'
            style={styles.input}
            onChangeText={(email) => this.setState({email})}
            value={this.state.email} />

          <TextInput secureTextEntry
            placeholder='Password'
            onSubmitEditing={() => {
              this.register()
            }}
            returnKeyType={'done'}
            ref={input => { this.inputs.password = input }}
            underlineColorAndroid='transparent'
            style={styles.input}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password} />

          <Button
            onPress={() => this.register()}
            backgroundColor={Colors.Primary}
            containerViewStyle={{marginLeft: 0, marginRight: 0}}
            fontSize={14}
            borderRadius={14}
            buttonStyle={{padding: 10}}
            title='Sing up'
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

  register () {
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
  },
  loginLink: {
    fontSize: 16,
    fontFamily: Styles.fonts.RobotoLight
  }
})
