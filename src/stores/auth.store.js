import { action, observable } from 'mobx'
import { apolloClient } from '../../App'
import { gql } from 'apollo-boost'

export class Auth {
  @observable isLogged = false
  @observable token = ''

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

        resolve()
      } catch (e) {
        reject({status: 'error', message: e.message})
      }
    })

  @action logout = () => {
    return new Promise(resolve => {
      this.isLogged = false
      this.token = ''

      resolve()
    })
  }
}
