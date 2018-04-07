import { action, observable } from 'mobx';
import { apolloClient } from '../../App';
import { gql } from 'apollo-boost';

export class Auth {
  @observable isLogged = false;
  @observable user = {};

  @action login = (username, password) =>
      new Promise(async (resolve, reject) => {
        if (!username || !password) {
          reject({status: 'error', message: 'Please provide both username and password'});
        }

        const query = gql`query Login($email: String!) { user(userSearch: {email: $email}) { id, firstname, lastname, email, password } }`;
        try {
          const response = await apolloClient.query({
            query,
            variables: {email: username},
          });

          const user = response.data.user;

          if (!user) {
            reject({status: 'error', message: 'Invalid credentials'});
          }

          if (password === user.password) {
            this.user = Object.assign(user, {password: undefined});
            this.isLogged = true;
            resolve({status: 'ok'});
          } else {
            reject({status: 'error', message: 'Invalid credentials'});
          }
        } catch (e) {
          reject({status: 'error', message: e});
        }
      });

  @action logout = () => {
    return new Promise(resolve => {
      this.isLogged = false;
      this.user = {};

      resolve();
    });
  };
}
