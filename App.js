import { Navigation } from 'react-native-navigation';
import { MobxRnnProvider } from './src/utils/mobx-rnn-provider';
import ApolloClient from "apollo-boost";

import { registerScreens } from './src/screens';
import { stores } from './src/stores';
import { ApiUrl } from './src/constants/config';
import { NavigationTabs, appStyle } from './src/constants/navigation';

export const apolloClient = new ApolloClient({
  uri: ApiUrl
});

registerScreens(stores, MobxRnnProvider);

Navigation.startTabBasedApp({
  tabs: NavigationTabs,
  appStyle: appStyle
});
