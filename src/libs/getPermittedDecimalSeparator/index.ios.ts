// On iOS keyboard can only have one symbol at a time (either dot or comma) so we accept both
// Details: https://ieatta.slack.com/archives/C01GTK53T8Q/p1658936908481629
import type GetPermittedDecimalSeparator from './types';

const getPermittedDecimalSeparator: GetPermittedDecimalSeparator = () => '.,';

export default getPermittedDecimalSeparator;
