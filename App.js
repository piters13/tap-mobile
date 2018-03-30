import { Navigation } from 'react-native-navigation';
import Provider from './src/utils/mobx-rnn-provider';
import Stores from './src/stores';

import { registerScreens } from './src/screens';

registerScreens(Stores, Provider);

Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'Main',
      screen: 'MainScreen',
      icon: require('./img/navicon_menu.png')
    }
  ]
});

