import { Navigation } from 'react-native-navigation';
import MainScreen from './main.screen';

export function registerScreens(store, Provider) {
  Navigation.registerComponent('MainScreen', () => MainScreen, store, Provider);
}