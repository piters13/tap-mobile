import { action, observable, toJS } from 'mobx'
import { apolloClient } from '../../App'
import { gql } from 'apollo-boost'
import * as R from 'ramda'

export class ActionsStore {
  @observable actions = []
  @observable loading = false

  @action fetchActions () {
    this.loading = true
    apolloClient.query({
      query: gql`query {
          me {
              actions {
                  id, type, task { id, title },
                  createdAt
              }
          }
      }`
    }).then(res => {
      if (res.data) {
        this.actions = R.sort((a, b) => (new Date(b.createdAt)).getTime() - (new Date(a.createdAt)).getTime(), res.data.me.actions)
        this.loading = false
      }
    })
  }

  @action createAction (type) {
    this.loading = true
    apolloClient.mutate({
      mutation: gql`mutation createAction($type: Int!) {
          createAction(action: {type: $type}) { id, type, task { id, title }, createdAt }
      }`,
      variables: {type}
    }).then((res) => {
      if (res.data) {
        this.actions = [res.data.createAction].concat(toJS(this.actions))
        this.loading = false
      }
    })
  }

  @action updateAction (action, update) {
    return new Promise((resolve, reject) => {
      this.loading = true
      apolloClient.mutate({
        mutation: gql`mutation updateAction($actionId: Int!, $type: Int, $taskId: Int) {
            updateAction(action: {type: $type, taskId: $taskId}, actionSearch: {id: $actionId}) {
                id, type, task { id, title }, createdAt
            }
        }`,
        variables: {
          actionId: action.id,
          type: update ? update.type : action.type,
          taskId: update ? update.taskId : action.task.id
        }
      }).then(res => {
        if (res.data) {
          const action = res.data.updateAction[0]
          const index = toJS(this.actions).findIndex((a) => a.id === action.id)
          this.actions = R.update(index, action, toJS(this.actions))

          this.loading = false
          resolve(action)
        }
      }).catch(() => reject())
    })
  }
}
