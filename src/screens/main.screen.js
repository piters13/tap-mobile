import React from 'react';
import { Button, Text, View } from 'react-native';
import { inject, observer } from 'mobx-react';

@inject('Auth') @observer
export class MainScreen extends React.Component {
  render() {
    return (
        <View>
          <Text>You are {this.props.Auth.user.firstname} {this.props.Auth.user.lastname}</Text>
          <Button onPress={() => this.logout()} title="Logout"/>
        </View>
    );
  }

  logout() {
    this.props.navigator.resetTo({
      screen: 'LoginScreen',
    });

    this.props.Auth.logout();
  }
}