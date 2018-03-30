import { observable, action } from 'mobx';

class Main {
  @observable item = 'This is an item.';

  @action setItem(data) {
    this.item = data;
  }
}
export default Main;