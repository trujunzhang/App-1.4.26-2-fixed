import PreventRemoveContext from './PreventRemoveContext';
import * as React from 'react';

export default function usePreventRemoveContext() {
  const value = React.useContext(PreventRemoveContext);

  if (value == null) {
    throw new Error(
      "Couldn't find the prevent remove context. Is your component inside NavigationContent?"
    );
  }

  return value;
}
