import { action, observable } from 'mobx';

export class Auth {
  @observable isLogged = false;
  @observable user = {};

  @action login = (username, password) =>
      new Promise((resolve, reject) => {
        if (username && password) {
          setTimeout(() => {
            this.user = {username};
            this.isLogged = true;
            resolve({status: 'success'});
          }, 1000);
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
