import type { Theme } from '../types';
import DefaultTheme from './DefaultTheme';
import * as React from 'react';

const ThemeContext = React.createContext<Theme>(DefaultTheme);

ThemeContext.displayName = 'ThemeContext';

export default ThemeContext;
