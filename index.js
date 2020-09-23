/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Navigation from './src/screens/Navigation';
import {name as appName} from './app.json';
import Identification from './src/screens/Identification'
AppRegistry.registerComponent(appName, () => Identification);
