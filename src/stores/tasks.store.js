import { action, observable } from 'mobx'
import { apolloClient } from '../../App'
import { gql } from 'apollo-boost'

export class TasksStore {
  @observable tasks = []

  @action fetchTasks = () => {
    apolloClient.query({
      query: gql`query { me { tasks { id, title } } }`,
      fetchPolicy: 'network-only'
    }).then(resp => {
      this.tasks = resp.data.me.tasks
    })
  }
}
