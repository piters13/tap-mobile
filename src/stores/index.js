import { AuthStore } from './auth.store'
import { TasksStore } from './tasks.store'

export const stores = {
  AuthStore: new AuthStore(),
  TasksStore: new TasksStore()
}
