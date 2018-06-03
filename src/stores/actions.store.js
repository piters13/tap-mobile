import { action, observable } from 'mobx'
import { apolloClient } from '../../App'
import { gql } from 'apollo-boost'

export class ActionsStore {
  @observable actions = []

  @action fetchActions = () => {
    apolloClient.query({
      query: gql`query { me { tasks {actions { type, createdAt } } } }`,
      fetchPolicy: 'network-only'
    }).then(resp => {
      this.actions = resp.data.me.actions
    })
  }
}
