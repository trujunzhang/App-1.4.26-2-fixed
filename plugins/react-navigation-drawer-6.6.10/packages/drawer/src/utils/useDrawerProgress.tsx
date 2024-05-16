import DrawerProgressContext from './DrawerProgressContext';
import * as React from 'react';
import type Animated from 'react-native-reanimated';

export default function useDrawerProgress():
  | Readonly<Animated.SharedValue<number>>
  | Animated.Node<number> {
  const progress = React.useContext(DrawerProgressContext);

  if (progress === undefined) {
    throw new Error(
      "Couldn't find a drawer. Is your component inside a drawer navigator?"
    );
  }

  return progress;
}
