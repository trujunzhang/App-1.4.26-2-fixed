import PropTypes from 'prop-types';
import {PageSection} from '@libs/Firebase/list/constant';

const pageRowPropTypes = PropTypes.shape({
    // rowKey: string
    // rowType: PageSection
    // rowData: any
    rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    rowType: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    // eslint-disable-next-line react/forbid-prop-types
    rowData: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
});

export {
    // eslint-disable-next-line import/prefer-default-export
    pageRowPropTypes,
};
