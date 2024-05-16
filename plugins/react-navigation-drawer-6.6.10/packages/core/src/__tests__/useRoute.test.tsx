import BaseNavigationContainer from '../BaseNavigationContainer';
import Screen from '../Screen';
import type { RouteProp } from '../types';
import useNavigationBuilder from '../useNavigationBuilder';
import useRoute from '../useRoute';
import MockRouter from './__fixtures__/MockRouter';
import { render } from '@testing-library/react-native';
import * as React from 'react';

it('gets route prop from context', () => {
  expect.assertions(1);

  const TestNavigator = (props: any): any => {
    const { state, descriptors } = useNavigationBuilder(MockRouter, props);

    return state.routes.map((route) => descriptors[route.key].render());
  };

  const Test = () => {
    const route = useRoute<RouteProp<{ sample: { x: string } }, 'sample'>>();

    expect(route?.params?.x).toEqual(1);

    return null;
  };

  render(
    <BaseNavigationContainer>
      <TestNavigator>
        <Screen name="foo" component={Test} initialParams={{ x: 1 }} />
      </TestNavigator>
    </BaseNavigationContainer>
  );
});
