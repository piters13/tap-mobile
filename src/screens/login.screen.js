import React from 'react';
import { Button, Text, TextInput, View, Keyboard, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';
import { MainScreen } from './main.screen';

@inject('Auth') @observer
export class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'Mary85@hotmail.com',
      password: 'Jey6JwNg',
      error: null
    };
  }

  render() {
    return (
        <View style={styles.container}>
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
          <Button onPress={() => this.login()} title="Log in"/>

          <Text>{this.state.error ? this.state.error : ''}</Text>
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
            screen: 'MainScreen'
          })
        })
        .catch(err => this.setState({error: err.message}));
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#ECF0F3',
    borderWidth: 0,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    color: '#333',
    fontSize: 14,
    margin: 4,
    width: 270
  }
});
