/* eslint-disable import/prefer-default-export */

/* eslint-disable rulesdir/no-inline-named-export */

/* eslint-disable spaced-comment */
import PropTypes from 'prop-types';

export const peopleInEventPropTypes = PropTypes.shape({
    /* Base(5)*/
    uniqueId: PropTypes.string.isRequired,
    flag: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    creatorId: PropTypes.string.isRequired,
    /* Common(1)*/
    recipeIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    /* point(3)*/
    restaurantId: PropTypes.string.isRequired,
    eventId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
});

export const peopleInEventsPropTypes = PropTypes.objectOf(
    PropTypes.shape({
        /** The time the emoji was added */
        id: PropTypes.string,

        /** All the users who have added this emoji */
        item: peopleInEventPropTypes,
    }),
);
