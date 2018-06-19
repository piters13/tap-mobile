import { action, observable, toJS } from 'mobx'
import { apolloClient } from '../../App'
import { gql } from 'apollo-boost'
import * as R from 'ramda'

export class TasksStore {
  @observable tasks = []

  @action fetchTasks = () => {
    apolloClient.query({
      query: gql`query { me { tasks { id, title, actions { id, type, createdAt }, descriptions { id, title, value, createdAt } } } }`,
      fetchPolicy: 'network-only'
    }).then(resp => {
      this.tasks = resp.data.me.tasks
    })
  }

  @action addDescriptionToTask = (taskId, description) => {
    debugger
    const index = toJS(this.tasks).findIndex(t => t.id === taskId)
    const oldTask = toJS(this.tasks)[index]
    const newTask = Object.assign({}, oldTask, {descriptions: oldTask.descriptions.concat([description])})
    this.tasks = R.update(index, newTask, toJS(this.tasks))
  }
}
