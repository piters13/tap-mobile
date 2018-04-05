import { action, computed, observable } from 'mobx';
import { apolloClient } from '../../App';
import { gql } from 'apollo-boost';
import { guestTabs, userTabs } from '../config/navigation';

export class Auth {
  @observable isLogged = false;
  @observable user = {};

  @action login = (username, password) =>
      new Promise((resolve, reject) => {
        if (username && password) {
          const query = gql`query Login($email: String!) { user(userSearch: {email: $email}) { id, firstname, lastname, email, password } }`;

          apolloClient.query({
            query,
            variables: {email: username},
          }).then(response => {
            const user = response.data.user;

            console.log(user);

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
          }).catch(err => reject({status: 'error', message: err}));
        } else {
          reject({status: 'error', message: 'Missing username or password'});
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
