import type { ListenerMap } from './NavigationBuilderContext';
import * as React from 'react';

/**
 * Hook which lets child navigators add action listeners.
 */
export default function useChildListeners() {
  const { current: listeners } = React.useRef<{
    [K in keyof ListenerMap]: ListenerMap[K][];
  }>({
    action: [],
    focus: [],
  });

  const addListener = React.useCallback(
    <T extends keyof ListenerMap>(type: T, listener: ListenerMap[T]) => {
      listeners[type].push(listener);

      let removed = false;
      return () => {
        const index = listeners[type].indexOf(listener);

        if (!removed && index > -1) {
          removed = true;
          listeners[type].splice(index, 1);
        }
      };
    },
    [listeners]
  );

  return {
    listeners,
    addListener,
  };
}
