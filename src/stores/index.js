import { AuthStore } from './auth.store'
import { TasksStore } from './tasks.store'
import { BleStore } from './ble.store'
import { ActionsStore } from './actions.store'

export const stores = {
  AuthStore: new AuthStore(),
  BleStore: new BleStore(),
  TasksStore: new TasksStore(),
  ActionsStore: new ActionsStore()
}
