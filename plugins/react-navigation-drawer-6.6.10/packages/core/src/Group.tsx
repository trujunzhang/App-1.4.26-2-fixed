import type { RouteGroupConfig } from './types';
import type { ParamListBase } from '@react-navigation/routers';

/**
 * Empty component used for grouping screen configs.
 */
export default function Group<
  ParamList extends ParamListBase,
  ScreenOptions extends {}
>(_: RouteGroupConfig<ParamList, ScreenOptions>) {
  /* istanbul ignore next */
  return null;
}
