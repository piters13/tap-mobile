import React, { Component } from 'react';
import { AppRegistry, Button, View } from 'react-native';
import { Provider as MobXProvider, observer } from 'mobx-react/native';

import Navigator from './src/navigator';

import Store from './src/stores/store';

const store = new Store();

@observer
class App extends Component {
  render() {
    return (
        <MobXProvider store={store}>
          <View style={{ paddingTop: 20 }}>
            <Navigator />
          </View>
        </MobXProvider>
    );
  }
}

export default App;