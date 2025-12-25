/**
 * @format
 */

import { AppRegistry } from 'react-native';
import Config from 'react-native-config';
import App from './App';
import { name as appName } from './app.json';

// Bootstrap: Inject flavor from react-native-config into global scope
// This must happen before any imports that use APP_FLAVOR
const flavor = Config.APP_FLAVOR || 'full';
console.log('[Config] APP_FLAVOR:', flavor);
console.log('[Config] APP_NAME:', Config.APP_NAME);
globalThis.__APP_FLAVOR__ = flavor;

AppRegistry.registerComponent(appName, () => App);
