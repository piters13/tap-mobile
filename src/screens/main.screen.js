import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { inject, observer } from 'mobx-react';

@inject('Auth') @observer
export class MainScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  render() {
    return (
        <View>
          <TextInput placeholder="Email"
                     keyboardType="email-address"
                     onChangeText={(username) => this.setState({username})}
                     value={this.state.username}/>
          <TextInput secureTextEntry={true}
                     placeholder="Password"
                     onChangeText={(password) => this.setState({password})}
                     value={this.state.password}/>
          <Button onPress={() => this.login()} title="Log in"/>
          <Button onPress={() => this.logout()} title="Logout"/>

          <Text>Current state: {this.props.Auth.isLogged ? 'logged' : 'not logged'}</Text>
        </View>
    );
  }

  login() {
    this.props.Auth.login(this.state.username, this.state.password  );
  }

  logout() {
    this.props.Auth.logout();
  }
}