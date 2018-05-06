import { Navigation } from 'react-native-navigation'
import { MobxRnnProvider } from './src/utils/mobx-rnn-provider'
import ApolloClient from 'apollo-boost'

import { registerScreens } from './src/screens'
import { stores } from './src/stores'
import { ApiUrl } from './src/constants/config'
import { Screens } from './src/constants/screens'
import { appStyle, NavigationTabs } from './src/constants/navigation'

export const apolloClient = new ApolloClient({
  uri: ApiUrl
})

const rootNavigation = Navigation

registerScreens(stores, MobxRnnProvider, rootNavigation)

rootNavigation.startSingleScreenApp({
  screen: Screens.Main
})

export const initPublicApp = () => rootNavigation.startSingleScreenApp({
  screen: Screens.Login,
  animationType: 'fade'
})

export const initPrivateApp = () => rootNavigation.startTabBasedApp({
  tabs: NavigationTabs,
  appStyle: appStyle,
  animationType: 'fade'
})
