import CardAnimationContext from './CardAnimationContext';
import * as React from 'react';

export default function useCardAnimation() {
  const animation = React.useContext(CardAnimationContext);

  if (animation === undefined) {
    throw new Error(
      "Couldn't find values for card animation. Are you inside a screen in Stack?"
    );
  }

  return animation;
}
