import { Navigation } from 'react-native-navigation'
import { LoginScreen } from './login.screen'
import { MainScreen } from './main.screen'
import { Screens } from '../constants/screens'
import { defaultNavigatorStyle } from '../constants/navigation'

const screens = [
  {screen: Screens.Login.screen, component: LoginScreen},
  {screen: Screens.Main.screen, component: MainScreen},
]

export function registerScreens (store, Provider) {
  screens.forEach(s => {
    s.component.navigatorStyle = Object.assign(
      s.component.navigatorStyle ? s.component.navigatorStyle : {},
      defaultNavigatorStyle
    )
    Navigation.registerComponent(s.screen, () => s.component, store, Provider)
  })
}