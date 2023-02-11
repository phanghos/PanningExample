/**
 * @format
 */

import 'react-native-gesture-handler';

import { AppRegistry } from 'react-native';
import RNGH2WithoutSnapping from './src/RNGH2WithoutSnapping';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => RNGH2WithoutSnapping);
