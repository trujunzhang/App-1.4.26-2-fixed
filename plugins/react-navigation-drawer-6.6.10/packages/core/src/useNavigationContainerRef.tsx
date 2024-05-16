import createNavigationContainerRef from './createNavigationContainerRef';
import type { NavigationContainerRefWithCurrent } from './types';
import * as React from 'react';

export default function useNavigationContainerRef<
  ParamList extends {} = ReactNavigation.RootParamList
>(): NavigationContainerRefWithCurrent<ParamList> {
  const navigation =
    React.useRef<NavigationContainerRefWithCurrent<ParamList> | null>(null);

  if (navigation.current == null) {
    navigation.current = createNavigationContainerRef<ParamList>();
  }

  return navigation.current;
}
