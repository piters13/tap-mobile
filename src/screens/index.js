import { Navigation } from 'react-native-navigation'
import { LoginScreen } from './login.screen'
import { MainScreen } from './main.screen'
import { DeviceInteractionScreen } from './device-interaction.screen'
import { Screens } from '../constants/screens'
import { defaultNavigatorStyle } from '../constants/navigation'
import { CreateTaskScreen } from './create-task.screen'
import { SettingsScreen } from './settings.screen'
import { AvailableDevicesScreen } from './available-devices.screen'
import { CreateAccountScreen } from './create-account.screen'

const screens = [
  {screen: Screens.Login.screen, component: LoginScreen},
  {screen: Screens.Main.screen, component: MainScreen},
  {screen: Screens.DeviceInteraction.screen, component: DeviceInteractionScreen},
  {screen: Screens.CreateTask.screen, component: CreateTaskScreen},
  {screen: Screens.Settings.screen, component: SettingsScreen},
  {screen: Screens.AvailableDevices.screen, component: AvailableDevicesScreen},
  {screen: Screens.CreateAccount.screen, component: CreateAccountScreen}
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
