import { Screens } from './screens'
import { Icons } from './images'
import { Colors } from './colors'
import { Styles } from './styles'

export const defaultNavigatorStyle = {
  navBarHidden: true
}

export const NavigationTabs = [
  {
    label: Screens.Tasks.title,
    screen: Screens.Tasks.screen,
    icon: Icons.Home
  },
  {
    label: Screens.DeviceInteraction.title,
    screen: Screens.DeviceInteraction.screen,
    icon: Icons.Connection
  },
  {
    label: Screens.Settings.title,
    screen: Screens.Settings.screen,
    icon: Icons.Cog
  }
]

export const appStyle = {
  tabBarSelectedButtonColor: Colors.Primary,
  tabFontFamily: Styles.fonts.RobotoLight
}
