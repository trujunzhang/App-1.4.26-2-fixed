// eslint-disable-next-line no-restricted-imports
import {defaultTheme} from '@styles/theme';
import Styles from '../../src/styles';
import * as pageStyle from '../../src/styles/pages';

describe('Styles', () => {
    it('should match snapshot', () => {
        // eslint-disable-next-line rulesdir/prefer-underscore-method
        const pageStyles = Object.values(pageStyle).forEach((func) => {
            if (typeof func === 'function') {
                return func(defaultTheme);
            }
            return {};
        });

        expect(Styles).toMatchSnapshot();
    });
});
