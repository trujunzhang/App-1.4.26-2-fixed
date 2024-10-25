import {PortalProvider} from '@gorhom/portal';
import React from 'react';
import {LogBox} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PickerStateProvider} from 'react-native-picker-select';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import '../wdyr';
import ActiveElementRoleProvider from './components/ActiveElementRoleProvider';
import ActiveWorkspaceContextProvider from './components/ActiveWorkspace/ActiveWorkspaceProvider';
import ColorSchemeWrapper from './components/ColorSchemeWrapper';
import ComposeProviders from './components/ComposeProviders';
import CustomStatusBarAndBackground from './components/CustomStatusBarAndBackground';
import CustomStatusBarAndBackgroundContextProvider from './components/CustomStatusBarAndBackground/CustomStatusBarAndBackgroundContextProvider';
import ErrorBoundary from './components/ErrorBoundary';
import FirebaseSync from './components/Firebase/sync';
import HTMLEngineProvider from './components/HTMLEngineProvider';
import AppNotify from './components/Ieatta/components/Notify';
import InitialURLContextProvider from './components/InitialURLContextProvider';
import {LocaleContextProvider} from './components/LocaleContextProvider';
import OnyxProvider from './components/OnyxProvider';
import PopoverContextProvider from './components/PopoverProvider';
import RealmLocalProvider from './components/Realm/provider';
import SafeArea from './components/SafeArea';
import ScrollOffsetContextProvider from './components/ScrollOffsetContextProvider';
import ThemeIllustrationsProvider from './components/ThemeIllustrationsProvider';
import ThemeProvider from './components/ThemeProvider';
import ThemeStylesProvider from './components/ThemeStylesProvider';
import {CurrentRestaurantIDContextProvider} from './components/withCurrentRestaurantID';
import {EnvironmentProvider} from './components/withEnvironment';
import {KeyboardStateProvider} from './components/withKeyboardState';
import {WindowDimensionsProvider} from './components/withWindowDimensions';
import useDefaultDragAndDrop from './hooks/useDefaultDragAndDrop';
import {ReportIDsContextProvider} from './hooks/useReportIDs';
import Ieatta from './Ieatta';
import OnyxUpdateManager from './libs/actions/OnyxUpdateManager';
import type {Route} from './ROUTES';

type AppProps = {
    /** URL passed to our top-level React Native component by HybridApp. Will always be undefined in "pure" NewDot builds. */
    url?: Route;
};

LogBox.ignoreLogs([
    // Basically it means that if the app goes in the background and back to foreground on Android,
    // the timer is lost. Currently Ieatta is using a 30 minutes interval to refresh personal details.
    // More details here: https://git.io/JJYeb
    'Setting a timer for a long period of time',
    'Require cycle:',
]);

const fill = {flex: 1};

function App({url}: AppProps) {
    useDefaultDragAndDrop();
    OnyxUpdateManager();
    return (
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
                        WindowDimensionsProvider,
                        KeyboardStateProvider,
                        PopoverContextProvider,
                        ScrollOffsetContextProvider,
                        PickerStateProvider,
                        EnvironmentProvider,
                        CustomStatusBarAndBackgroundContextProvider,
                        ActiveElementRoleProvider,
                        ActiveWorkspaceContextProvider,
                        ReportIDsContextProvider,
                        CurrentRestaurantIDContextProvider,
                        RealmLocalProvider,
                    ]}
                >
                    <CustomStatusBarAndBackground />
                    <ErrorBoundary errorMessage="NewIeatta crash caught by error boundary">
                        <ColorSchemeWrapper>
                            <Ieatta />
                        </ColorSchemeWrapper>
                    </ErrorBoundary>
                    <FirebaseSync />
                    <AppNotify />
                </ComposeProviders>
            </GestureHandlerRootView>
        </InitialURLContextProvider>
    );
}

App.displayName = 'App';

export default App;
