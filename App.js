import React from 'react';
import { Text, View } from 'react-native';
import { observer } from 'mobx-react/native';
import { Router, Stack, Scene } from 'react-native-router-flux';
import MainScene from './src/scenes/main-scene';

export default class App extends React.Component {
  render() {
    return (
      <Router wrapBy={observer}>
        <Stack headerMode="screen">
          <Scene key="home" component={MainScene} title="Tap"/>
        </Stack>
      </Router>
    );
  }
}
