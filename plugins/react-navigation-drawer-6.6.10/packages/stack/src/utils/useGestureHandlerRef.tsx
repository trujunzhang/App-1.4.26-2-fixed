import StackGestureRefContext from './GestureHandlerRefContext';
import * as React from 'react';

export default function useGestureHandlerRef() {
  const ref = React.useContext(StackGestureRefContext);

  if (ref === undefined) {
    throw new Error(
      "Couldn't find a ref for gesture handler. Are you inside a screen in Stack?"
    );
  }

  return ref;
}
