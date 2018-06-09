import { action, observable } from 'mobx'
import { apolloClient } from '../../App'
import { gql } from 'apollo-boost'

export class ActionsStore {
  @observable actions = []

  @action fetchActions () {
    apolloClient.query({
      query: gql`query { me { actions { id, type, task { id }, createdAt } } }`
    }).then(res => {
      if (res.data) {
        this.actions = res.data.me.actions
      }
    })
  }

  @action createAction (type) {
    apolloClient.mutate({
      mutation: gql`mutation createAction($type: Int!) { createAction(action: {type: $type}) { id, type, task { id }, createdAt } }`,
      variables: {type}
    }).then((res) => {
      if (res.data) {
        this.actions = this.actions.concat([res.data.createAction])
      }
    })
  }
}
