import { action, observable } from 'mobx'
import { apolloClient } from '../../App'
import { gql } from 'apollo-boost'

export class ActionsStore {
  @observable actions = []

  @action fetchActions () {
    apolloClient.query({
      query: gql`query { me { actions { id, type, task { id } } } }`
    })
  }

  @action createAction (type) {
    apolloClient.mutation({
      query: gql`mutation createAction($type: Int!) { createAction(action: {type: $type}) { id, type, task { id } } }`,
      variables: {type}
    }).then((res) => {
      if (res.data.action) {
        this.actions.concat([res.data.action])
      }
    })
  }
}