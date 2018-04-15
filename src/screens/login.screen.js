import React from 'react'
import { Alert, Button, Image, Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Images } from '../constants/images'
import { Screens } from '../constants/screens'
import { Colors } from '../constants/colors'
import { Header } from '../components/header.component'
import { Styles } from '../constants/styles'

@inject('Auth') @observer
export class LoginScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      username: 'Mary85@hotmail.com',
      password: 'Jey6JwNg',
    }

    this.props.navigator.toggleTabs({
      to: 'hidden',
      animated: false
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Image source={Images.Logo} style={styles.logo}/>
        <Header title={`Why, hello there`}/>

        <TextInput placeholder="Email"
                   keyboardType="email-address"
                   underlineColorAndroid="transparent"
                   style={styles.input}
                   onChangeText={(username) => this.setState({username})}
                   value={this.state.username}/>

        <TextInput secureTextEntry={true}
                   placeholder="Password"
                   underlineColorAndroid="transparent"
                   style={styles.input}
                   onChangeText={(password) => this.setState({password})}
                   value={this.state.password}/>

        <View style={styles.restingSwitch}>
          <Button onPress={() => this.login()} title="Sign in"/>
        </View>

        <View style={styles.registerLinkContainer}>
          <Text style={styles.registerLink}
                onPress={() => Alert.alert('Error', 'Not implemented')}>You need to create account?</Text>
        </View>
      </View>
    )
  }

  login () {
    Keyboard.dismiss()
    this.props.Auth.login(this.state.username, this.state.password)
      .then(() => {
        this.props.navigator.resetTo({
          screen: Screens.Primary.screen,
          animated: true,
          animationType: 'slide-horizontal'
        })
      }).catch(err => Alert.alert('Authentication error', err.message))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 180,
    resizeMode: 'contain',
    maxHeight: 160
  },
  input: {
    backgroundColor: '#ECF0F3',
    borderWidth: 0,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 14,
    color: Colors.TextPrimary,
    fontSize: 14,
    fontFamily: Styles.fonts.Roboto,
    marginBottom: 10,
    width: 270
  },
  restingSwitch: {
    width: 270,
  },
  registerLinkContainer: {
    paddingTop: 30,
  },
  registerLink: {
    fontSize: 16,
    fontFamily: Styles.fonts.RobotoLight,
  }
})
