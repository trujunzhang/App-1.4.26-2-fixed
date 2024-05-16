import PropTypes from 'prop-types';
import {restaurantPropTypes} from '@pages/proptypes';

const propTypes = {
    /** Style for hovered state */
    // eslint-disable-next-line react/forbid-prop-types
    hoverStyle: PropTypes.object,

    /** The detailed restaurant that is being rendered */
    restaurant: restaurantPropTypes.isRequired,

    /** Whether this option is currently in focus so we can modify its style */
    isFocused: PropTypes.bool,

    /** A function that is called when an option is selected. Selected option is passed as a param */
    onSelectRow: PropTypes.func,

    style: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object]),
};

const defaultProps = {
    hoverStyle: undefined,
    onSelectRow: () => {},
    style: null,
    isFocused: false,
};

export {propTypes, defaultProps};
