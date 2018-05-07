import React from 'react'
import { Keyboard, StyleSheet, TextInput, View, KeyboardAvoidingView } from 'react-native'
import { Button } from 'react-native-elements'
import { inject, observer } from 'mobx-react'
import { Header } from '../components/header.component'
import { Styles } from '../constants/styles'
import { Colors } from '../constants/colors'
import { Screens } from '../screens'
import { apolloClient } from '../../App'
import { gql } from 'apollo-boost'

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

    this.focusNextField = this.focusNextField.bind(this)
    this.inputs = {}
  }

  render () {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={{flex: 1, width: Styles.baseWidth, justifyContent: 'center'}}
          behavior='padding'>

          <Header title={`Happy to have You!`} subtitle={'Simply fill the form below'} />

          <TextInput
            placeholder='First name'
            onSubmitEditing={() => {
              this.focusNextField('Last name')
            }}
            returnKeyType={'next'}
            ref={input => { this.inputs['First name'] = input }}
            underlineColorAndroid='transparent'
            style={styles.input}
            onChangeText={(firstName) => this.setState({firstName})}
            value={this.state.firstName} />

          <TextInput
            placeholder='Last name'
            onSubmitEditing={() => {
              this.focusNextField('Email')
            }}
            returnKeyType={'next'}
            ref={input => { this.inputs['Last name'] = input }}
            underlineColorAndroid='transparent'
            style={styles.input}
            onChangeText={(lastName) => this.setState({lastName})}
            value={this.state.lastName} />

          <TextInput
            placeholder='Email'
            keyboardType='email-address'
            onSubmitEditing={() => {
              this.focusNextField('Password')
            }}
            returnKeyType={'next'}
            ref={input => { this.inputs['Email'] = input }}
            underlineColorAndroid='transparent'
            style={styles.input}
            onChangeText={(email) => this.setState({email})}
            value={this.state.email} />

          <TextInput secureTextEntry
            placeholder='Password'
            returnKeyType={'done'}
            ref={input => { this.inputs['Password'] = input }}
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
    }).then(() => this.props.navigator.navigate({
      screen: Screens.LoginScreen.screen
    }))
  }

  focusNextField (id) {
    this.inputs[id].focus()
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
