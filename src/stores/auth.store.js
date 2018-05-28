import { action, observable } from 'mobx'
import { apolloClient } from '../../App'
import { gql } from 'apollo-boost'
import { AsyncStorage } from 'react-native'

export class AuthStore {
  @observable isLogged = false
  @observable token = ''
  @observable user = {firstname: '', lastname: '', email: ''}

  @action rehydrate = async () => {
    const token = await AsyncStorage.getItem('token')

    if (token) {
      this.token = token
      this.isLogged = true
      this.fetchUser()
    }
  }

  @action fetchUser = () => {
    apolloClient.query({
      query: gql`query { me { firstname, lastname, email } }`,
      fetchPolicy: 'network-only'
    }).then(resp => {
      this.user = resp.data.me
    })
  }

  @action login = (email, password) =>
    new Promise(async (resolve, reject) => {
      if (!email || !password) {
        reject({status: 'error', message: 'Please provide both email and password'})
        return
      }

      const mutation = gql`mutation Login($email: String!, $password: String!) { login(email: $email, password: $password) }`
      try {
        const response = await apolloClient.mutate({
          mutation,
          variables: {email, password},
        })

        if (!response.data) {
          reject({status: 'error', message: 'Invalid credentials'})
          return
        }

        this.token = response.data.login
        this.isLogged = true
        AsyncStorage.setItem('token', this.token)

        resolve()

        this.fetchUser()
      } catch (e) {
        reject({status: 'error', message: e.message})
      }
    })

  @action logout = () => {
    return new Promise(resolve => {
      this.isLogged = false
      this.token = ''
      this.user = {firstname: '', lastname: '', email: ''}
      AsyncStorage.setItem('token', this.token)

      resolve()
    })
  }
}
