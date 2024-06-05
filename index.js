/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Routes from './src/routes';

import Reactotron from 'reactotron-react-native';

Reactotron
  .useReactNative() // Adiciona plugins para React Native
  .connect(); // Conecta ao aplicativo

AppRegistry.registerComponent(appName, () => Routes);
