import { Screens } from './screens'
import { Icons } from './images'
import { Colors } from './colors'

export const defaultNavigatorStyle = {
  navBarHidden: true
}

export const NavigationTabs = [
  {
    label: Screens.Main.title,
    screen: Screens.Main.screen,
    icon: Icons.Home
  },
  {
    label: Screens.DeviceInteraction.title,
    screen: Screens.DeviceInteraction.screen,
    icon: Icons.Connection
  }
]

export const appStyle = {
  tabBarSelectedButtonColor: Colors.Primary
}
