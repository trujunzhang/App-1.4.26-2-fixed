import {PortalProvider} from '@gorhom/portal';
import * as Sentry from '@sentry/react-native';
import React from 'react';
import {LogBox} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PickerStateProvider} from 'react-native-picker-select';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import '../wdyr';
import ActiveElementRoleProvider from './components/ActiveElementRoleProvider';
import ColorSchemeWrapper from './components/ColorSchemeWrapper';
import ComposeProviders from './components/ComposeProviders';
import CustomStatusBarAndBackground from './components/CustomStatusBarAndBackground';
import CustomStatusBarAndBackgroundContextProvider from './components/CustomStatusBarAndBackground/CustomStatusBarAndBackgroundContextProvider';
import ErrorBoundary from './components/ErrorBoundary';
import FirebaseSync from './components/Firebase/sync';
import FullScreenBlockingViewContextProvider from './components/FullScreenBlockingViewContextProvider';
import HTMLEngineProvider from './components/HTMLEngineProvider';
import AppNotify from './components/Ieatta/components/Notify';
import InitialURLContextProvider from './components/InitialURLContextProvider';
import {InputBlurContextProvider} from './components/InputBlurContext';
import KeyboardProvider from './components/KeyboardProvider';
import {LocaleContextProvider} from './components/LocaleContextProvider';
import OnyxProvider from './components/OnyxProvider';
import PopoverContextProvider from './components/PopoverProvider';
import {ProductTrainingContextProvider} from './components/ProductTrainingContext';
import RealmLocalProvider from './components/Realm/provider';
import SafeArea from './components/SafeArea';
import ScrollOffsetContextProvider from './components/ScrollOffsetContextProvider';
import {SearchRouterContextProvider} from './components/Search/SearchRouter/SearchRouterContext';
import ThemeIllustrationsProvider from './components/ThemeIllustrationsProvider';
import ThemeProvider from './components/ThemeProvider';
import ThemeStylesProvider from './components/ThemeStylesProvider';
import {FullScreenContextProvider} from './components/VideoPlayerContexts/FullScreenContext';
import {PlaybackContextProvider} from './components/VideoPlayerContexts/PlaybackContext';
import {VideoPopoverMenuContextProvider} from './components/VideoPlayerContexts/VideoPopoverMenuContext';
import {VolumeContextProvider} from './components/VideoPlayerContexts/VolumeContext';
import {EnvironmentProvider} from './components/withEnvironment';
import {KeyboardStateProvider} from './components/withKeyboardState';
import CONFIG from './CONFIG';
import Expensify from './Expensify';
import {ReportAttachmentsProvider} from './expPages/home/report/ReportAttachmentsContext';
import {CurrentReportIDContextProvider} from './hooks/useCurrentReportID';
import useDefaultDragAndDrop from './hooks/useDefaultDragAndDrop';
import OnyxUpdateManager from './libs/actions/OnyxUpdateManager';
import {SearchRestaurantsRouterContextProvider} from './pages/searchPages/restaurants/SearchRouter/SearchRestaurantsRouterContext';
import type {Route} from './ROUTES';
// import './setup/backgroundTask';
import {SplashScreenStateContextProvider} from './SplashScreenStateContext';

Sentry.init({
    dsn: 'https://ada799335a52a22f58e7783475f9e9fe@o76508.ingest.us.sentry.io/4508392789377024',

    // uncomment the line below to enable Spotlight (https://spotlightjs.com)
    // spotlight: __DEV__,
});

/** Values passed to our top-level React Native component by HybridApp. Will always be undefined in "pure" NewDot builds. */
type AppProps = {
    /** URL containing all necessary data to run React Native app (e.g. login data) */
    url?: Route;
};

LogBox.ignoreLogs([
    // Basically it means that if the app goes in the background and back to foreground on Android,
    // the timer is lost. Currently Expensify is using a 30 minutes interval to refresh personal details.
    // More details here: https://git.io/JJYeb
    'Setting a timer for a long period of time',
    'Require cycle:',
    // We are not using expo-const, so ignore the warning.
    'No native ExponentConstants module found',
]);

const fill = {flex: 1};

const StrictModeWrapper = CONFIG.USE_REACT_STRICT_MODE_IN_DEV ? React.StrictMode : ({children}: {children: React.ReactElement}) => children;

// throw new Error('My first Sentry error!');

function App({url}: AppProps) {
    useDefaultDragAndDrop();
    OnyxUpdateManager();

    return (
        <StrictModeWrapper>
            <SplashScreenStateContextProvider>
                <InitialURLContextProvider url={url}>
                    <GestureHandlerRootView style={fill}>
                        <ComposeProviders
                            components={[
                                OnyxProvider,
                                ThemeProvider,
                                ThemeStylesProvider,
                                ThemeIllustrationsProvider,
                                SafeAreaProvider,
                                PortalProvider,
                                SafeArea,
                                LocaleContextProvider,
                                HTMLEngineProvider,
                                SearchRestaurantsRouterContextProvider,
                                RealmLocalProvider,
                                PopoverContextProvider,
                                CurrentReportIDContextProvider,
                                ScrollOffsetContextProvider,
                                ReportAttachmentsProvider,
                                PickerStateProvider,
                                EnvironmentProvider,
                                CustomStatusBarAndBackgroundContextProvider,
                                ActiveElementRoleProvider,
                                PlaybackContextProvider,
                                FullScreenContextProvider,
                                VolumeContextProvider,
                                VideoPopoverMenuContextProvider,
                                KeyboardProvider,
                                KeyboardStateProvider,
                                SearchRouterContextProvider,
                                ProductTrainingContextProvider,
                                InputBlurContextProvider,
                                FullScreenBlockingViewContextProvider,
                            ]}
                        >
                            <CustomStatusBarAndBackground />
                            <ErrorBoundary errorMessage="NewIeatta crash caught by error boundary">
                                <ColorSchemeWrapper>
                                    <Expensify />
                                </ColorSchemeWrapper>
                            </ErrorBoundary>
                            <FirebaseSync />
                            <AppNotify />
                        </ComposeProviders>
                    </GestureHandlerRootView>
                </InitialURLContextProvider>
            </SplashScreenStateContextProvider>
        </StrictModeWrapper>
    );
}

App.displayName = 'App';

export default Sentry.wrap(App);
