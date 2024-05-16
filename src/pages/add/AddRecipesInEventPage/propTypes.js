import PropTypes from 'prop-types';
import {eventPropTypes, peopleInEventPropTypes, recipesPropTypes} from '@pages/proptypes';

const propTypes = {
    /** Navigation route context info provided by react navigation */
    route: PropTypes.shape({
        /** Route specific parameters used on this screen */
        params: PropTypes.shape({
            /** The ID of the report this screen should display */
            restaurantId: PropTypes.string,
            peopleInEventId: PropTypes.string,
        }).isRequired,
    }).isRequired,
};

const defaultProps = {};

const BaseAddRecipesPagePropTypes = {
    peopleInEvent: peopleInEventPropTypes.isRequired,
    recipeDictInRestaurant: recipesPropTypes.isRequired,
};

const BaseAddRecipesPageDefaultProps = {};

export {propTypes, defaultProps, BaseAddRecipesPageDefaultProps, BaseAddRecipesPagePropTypes};
