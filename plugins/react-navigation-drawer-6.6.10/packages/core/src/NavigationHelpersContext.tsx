import type { NavigationHelpers } from './types';
import type { ParamListBase } from '@react-navigation/routers';
import * as React from 'react';

/**
 * Context which holds the navigation helpers of the parent navigator.
 * Navigators should use this context in their view component.
 */
const NavigationHelpersContext = React.createContext<
  NavigationHelpers<ParamListBase> | undefined
>(undefined);

export default NavigationHelpersContext;
