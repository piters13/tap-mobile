import React from 'react';
import { Button, Text, View } from 'react-native';
import { inject, observer } from 'mobx-react';

@inject('MainStore') @observer
export default class MainScreen extends React.Component {
  render() {
    return (
        <View>
          <Text>{this.props.MainStore.item}</Text>
          <Button onPress={() => this.props.MainStore.setItem('Welcome to Wadowice')} title="Edit item"/>
        </View>
    );
  }
}