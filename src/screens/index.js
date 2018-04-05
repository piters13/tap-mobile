import { Navigation } from 'react-native-navigation';
import { LoginScreen } from './login.screen';
import { MainScreen } from './main.screen';

export function registerScreens(store, Provider) {
  Navigation.registerComponent('LoginScreen', () => LoginScreen, store, Provider);
  Navigation.registerComponent('MainScreen', () => MainScreen, store, Provider);
}