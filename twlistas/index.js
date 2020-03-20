/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import {MessagesService} from './app/services/MessagesService';
import {EventListService} from './app/services/EventListService';

AppRegistry.registerComponent(appName, () => App);
MessagesService.handleBackgroundMessages();
EventListService.updateEventsNotifications();