import React from 'react';
import { Text, View } from 'react-native';
import { observer, Provider as MobXProvider } from 'mobx-react/native';

import Store from './src/stores/store';

const store = new Store();

@observer
export default class App extends React.Component {
  render() {
    return (
        <MobXProvider store={store}>
          <View style={{ paddingTop: 20 }}>
            <Text>Hejo!</Text>
          </View>
        </MobXProvider>
    );
  }
}
