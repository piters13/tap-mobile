import { LoginScreen } from './login.screen'
import { TasksScreen } from './tasks.screen'
import { DeviceInteractionScreen } from './device-interaction.screen'
import { Screens } from '../constants/screens'
import { defaultNavigatorStyle } from '../constants/navigation'
import { CreateTaskScreen } from './create-task.screen'
import { SettingsScreen } from './settings.screen'
import { AvailableDevicesScreen } from './available-devices.screen'
import { CreateAccountScreen } from './create-account.screen'
import { MainScreen } from './main.screen'
import { ClickNotificationScreen } from './click-notification.screen'
import { DashboardScreen } from './dashboard.screen'
import { ActionsScreen } from './actions.screen'
import { ConcreteTaskScreen } from './concrete-task.screen'
import { NewNoteScreen } from './new-note.screen'
import { ConcreteNoteScreen } from './concrete-note.screen'

const screens = [
  {screen: Screens.Main.screen, component: MainScreen},
  {screen: Screens.Login.screen, component: LoginScreen},
  {screen: Screens.CreateAccount.screen, component: CreateAccountScreen},
  {screen: Screens.Tasks.screen, component: TasksScreen},
  {screen: Screens.DeviceInteraction.screen, component: DeviceInteractionScreen},
  {screen: Screens.CreateTask.screen, component: CreateTaskScreen},
  {screen: Screens.Settings.screen, component: SettingsScreen},
  {screen: Screens.AvailableDevices.screen, component: AvailableDevicesScreen},
  {screen: Screens.ClickNotification.screen, component: ClickNotificationScreen},
  {screen: Screens.Dashboard.screen, component: DashboardScreen},
  {screen: Screens.ConcreteTask.screen, component: ConcreteTaskScreen},
  {screen: Screens.Actions.screen, component: ActionsScreen},
  {screen: Screens.NewNote.screen, component: NewNoteScreen},
  {screen: Screens.ConcreteNote.screen, component: ConcreteNoteScreen}
]

export function registerScreens (store, Provider, rootNavigation) {
  screens.forEach(s => {
    s.component.navigatorStyle = Object.assign(
      s.component.navigatorStyle ? s.component.navigatorStyle : {},
      defaultNavigatorStyle
    )
    rootNavigation.registerComponent(s.screen, () => s.component, store, Provider)
  })
}
