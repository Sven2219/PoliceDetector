/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Navigation from './src/screens/Navigation';
import {name as appName} from './app.json';
import Login from './src/screens/Login';

AppRegistry.registerComponent(appName, () => Login);
