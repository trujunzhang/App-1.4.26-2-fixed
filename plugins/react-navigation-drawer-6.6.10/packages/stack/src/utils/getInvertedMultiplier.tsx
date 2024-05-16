import type { GestureDirection } from '../types';
import { I18nManager } from 'react-native';

export default function getInvertedMultiplier(
  gestureDirection: GestureDirection
): 1 | -1 {
  switch (gestureDirection) {
    case 'vertical':
      return 1;
    case 'vertical-inverted':
      return -1;
    case 'horizontal':
      return I18nManager.getConstants().isRTL ? -1 : 1;
    case 'horizontal-inverted':
      return I18nManager.getConstants().isRTL ? 1 : -1;
  }
}
