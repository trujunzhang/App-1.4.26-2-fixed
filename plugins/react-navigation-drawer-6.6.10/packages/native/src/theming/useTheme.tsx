import ThemeContext from './ThemeContext';
import * as React from 'react';

export default function useTheme() {
  const theme = React.useContext(ThemeContext);

  return theme;
}
