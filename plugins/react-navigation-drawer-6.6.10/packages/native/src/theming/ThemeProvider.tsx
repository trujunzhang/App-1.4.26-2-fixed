import type { Theme } from '../types';
import ThemeContext from './ThemeContext';
import * as React from 'react';

type Props = {
  value: Theme;
  children: React.ReactNode;
};

export default function ThemeProvider({ value, children }: Props) {
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
