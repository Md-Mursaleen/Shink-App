/* eslint-disable prettier/prettier */
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { Amplify } from 'aws-amplify';
import App from './App';
import amplifyconfig from './src/amplifyconfiguration.json';

Amplify.configure(amplifyconfig);

AppRegistry.registerComponent(appName, () => App);
