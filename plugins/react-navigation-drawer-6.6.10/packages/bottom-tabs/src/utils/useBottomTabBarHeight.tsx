import BottomTabBarHeightContext from './BottomTabBarHeightContext';
import * as React from 'react';

export default function useBottomTabBarHeight() {
  const height = React.useContext(BottomTabBarHeightContext);

  if (height === undefined) {
    throw new Error(
      "Couldn't find the bottom tab bar height. Are you inside a screen in Bottom Tab Navigator?"
    );
  }

  return height;
}
