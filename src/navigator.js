import {
  StackNavigator,
} from 'react-navigation';

import MainScreen from './screens/main-screen';

const Navigator = StackNavigator({
  Main: { screen: MainScreen },
});

export default Navigator;