import PropTypes from 'prop-types';
import {eventPropTypes, peopleInEventPropTypes, usersPropTypes} from '@pages/proptypes';
import personalDetailsPropType from '@expPages/personalDetailsPropType';

const propTypes = {
    /** Navigation route context info provided by react navigation */
    route: PropTypes.shape({
        /** Route specific parameters used on this screen */
        params: PropTypes.shape({
            /** The ID of the report this screen should display */
            restaurantId: PropTypes.string,
            eventId: PropTypes.string,
        }).isRequired,
    }).isRequired,
};

const defaultProps = {};

const baseAddUsersPagePropTypes = {
    restaurantId: PropTypes.string.isRequired,
    eventId: PropTypes.string.isRequired,

    userIdsInPeopleInEvents: PropTypes.arrayOf(PropTypes.string).isRequired,
    userDict: usersPropTypes.isRequired,

    /** The personal details of the person who is logged in */
    currentUserPersonalDetails: personalDetailsPropType,
};

const baseAddUsersPageDefaultProps = {
    currentUserPersonalDetails: {
        pendingFields: {avatar: ''},
        accountID: '',
        avatar: '',
    },
};

export {propTypes, defaultProps, baseAddUsersPageDefaultProps, baseAddUsersPagePropTypes};
