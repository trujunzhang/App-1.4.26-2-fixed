import type { NavigationProp } from './types';
import type { ParamListBase } from '@react-navigation/routers';
import * as React from 'react';

/**
 * Context which holds the navigation prop for a screen.
 */
const NavigationContext = React.createContext<
  NavigationProp<ParamListBase> | undefined
>(undefined);

export default NavigationContext;
