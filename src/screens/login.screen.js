import React from 'react';
import { Button, Image, Keyboard, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import { inject, observer } from 'mobx-react';
import { MainScreen } from './main.screen';
import { Images } from '../config/images';

@inject('Auth') @observer
export class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'Mary85@hotmail.com',
      password: 'Jey6JwNg',
    };

    this.props.navigator.toggleNavBar({
      to: 'hidden',
      animated: false,
    });

    this.props.navigator.toggleTabs({
      to: 'hidden',
      animated: false,
    });
  }

  render() {
    return (
        <View style={styles.container}>
          <Image source={Images.Logo} style={styles.logo}/>
          <Text style={styles.header}>Why, hello there</Text>

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

          <View style={styles.buttonContainer}>
            <Button onPress={() => this.login()} title="Sign in"/>
          </View>

          <View style={styles.registerLinkContainer}>
            <Text style={styles.registerLink}
                  onPress={() => Alert.alert('Error', 'Not implemented')}>You need to create account?</Text>
          </View>
        </View>
    );
  }

  login() {
    Keyboard.dismiss();
    this.setState({error: null});
    this.props.Auth.login(this.state.username, this.state.password)
        .then(() => {
          this.setState({username: '', password: ''});
          this.props.navigator.resetTo({
            screen: 'MainScreen',
            animated: true,
            animationType: 'slide-horizontal'
          });
        }).catch(err => Alert.alert('Authentication error', err.message));
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 180,
    resizeMode: 'contain',
  },
  header: {
    textAlign: 'left',
    color: '#1ba1b7',
    fontSize: 20,
    fontWeight: 'bold',
    width: 230,
    paddingBottom: 15,
  },
  input: {
    backgroundColor: '#ECF0F3',
    borderWidth: 0,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 14,
    color: '#333',
    fontSize: 14,
    marginBottom: 10,
    width: 270,
  },
  buttonContainer: {
    width: 270,
  },
  registerLinkContainer: {
    paddingTop: 30,
  },
  registerLink: {
    fontSize: 16,
  }
});
