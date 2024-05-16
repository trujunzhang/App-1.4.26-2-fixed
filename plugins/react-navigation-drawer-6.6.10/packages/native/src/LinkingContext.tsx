import type { LinkingOptions } from './types';
import type { ParamListBase } from '@react-navigation/core';
import * as React from 'react';

const LinkingContext = React.createContext<{
  options: LinkingOptions<ParamListBase> | undefined;
}>({ options: undefined });

LinkingContext.displayName = 'LinkingContext';

export default LinkingContext;
