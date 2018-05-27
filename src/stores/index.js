import { AuthStore } from './auth.store'
import { TasksStore } from './tasks.store'
import { ActionsStore } from './actions.store'

export const stores = {
  AuthStore: new AuthStore(),
  TasksStore: new TasksStore(),
  ActionsStore: new ActionsStore()
}
