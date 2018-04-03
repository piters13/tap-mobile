import { Navigation } from 'react-native-navigation';
import { MobxRnnProvider } from './src/utils/mobx-rnn-provider';

import { registerScreens } from './src/screens';
import { stores } from './src/stores';

registerScreens(stores, MobxRnnProvider);

Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'Main',
      screen: 'MainScreen',
      icon: require('./img/navicon_menu.png')
    }
  ]
});

