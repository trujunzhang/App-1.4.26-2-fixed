import App from './src/index';
import { Assets } from '@react-navigation/elements';
import { registerRootComponent } from 'expo';
import { Asset } from 'expo-asset';
import 'react-native-gesture-handler';

Asset.loadAsync(Assets);

registerRootComponent(App);
