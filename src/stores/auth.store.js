import { action, observable } from 'mobx'
import { apolloClient } from '../../App'
import { gql } from 'apollo-boost'
import { AsyncStorage } from 'react-native'

export class AuthStore {
  @observable isLogged = false
  @observable token = ''

  @action rehydrate = async () => {
    const token = await AsyncStorage.getItem('token')

    if (token) {
      this.token = token
      this.isLogged = true
    }
  }

  @action login = (email, password) =>
    new Promise(async (resolve, reject) => {
      if (!email || !password) {
        reject({status: 'error', message: 'Please provide both email and password'})
      }

      const mutation = gql`mutation Login($email: String!, $password: String!) { login(email: $email, password: $password) }`
      try {
        const response = await apolloClient.mutate({
          mutation,
          variables: {email, password},
        })

        const token = response.data.login

        if (!token) {
          reject({status: 'error', message: 'Invalid credentials'})
        }

        this.token = token
        this.isLogged = true
        AsyncStorage.setItem('token', this.token)

        resolve()
      } catch (e) {
        reject({status: 'error', message: e.message})
      }
    })

  @action logout = () => {
    return new Promise(resolve => {
      this.isLogged = false
      this.token = ''
      AsyncStorage.setItem('token', this.token)

      resolve()
    })
  }
}
