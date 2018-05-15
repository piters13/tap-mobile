import { Navigation } from 'react-native-navigation'
import { MobxRnnProvider } from './src/utils/mobx-rnn-provider'
import ApolloClient from 'apollo-boost'

import { registerScreens } from './src/screens'
import { stores } from './src/stores'
import { ApiUrl } from './src/constants/config'
import { Screens } from './src/constants/screens'
import { appStyle, NavigationTabs } from './src/constants/navigation'

Object.setPrototypeOf = Object.setPrototypeOf || function (obj, proto) {
  obj.__proto__ = proto
  return obj
}

export const apolloClient = new ApolloClient({
  uri: ApiUrl,
  request: async (operation) => {
    operation.setContext({
      headers: {
        authorization: stores.AuthStore.token
      }
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    console.log(graphQLErrors)
    console.log(networkError)
  },
})

const rootNavigation = Navigation

registerScreens(stores, MobxRnnProvider, rootNavigation)

rootNavigation.startSingleScreenApp({
  screen: Screens.Main,
  animationType: 'none'
})

export const initPublicApp = () => rootNavigation.startSingleScreenApp({
  screen: Screens.Login,
  animationType: 'none'
})

export const initPrivateApp = () => rootNavigation.startTabBasedApp({
  tabs: NavigationTabs,
  appStyle: appStyle,
  animationType: 'none'
})
