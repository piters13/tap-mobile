import { Screens } from './screens'
import { Icons } from './images'
import { Colors } from './colors'

export const defaultNavigatorStyle = {
  navBarHidden: true,
}

export const NavigationTabs = [
  {
    label: Screens.Main.title,
    screen: Screens.Main.screen,
    icon: Icons.Home,
  }
]

export const appStyle = {
  tabBarSelectedButtonColor: Colors.Main
}
