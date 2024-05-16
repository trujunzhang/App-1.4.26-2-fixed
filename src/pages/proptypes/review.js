/* eslint-disable import/prefer-default-export */

/* eslint-disable rulesdir/no-inline-named-export */

/* eslint-disable spaced-comment */
import PropTypes from 'prop-types';

export const reviewPropTypes = PropTypes.shape({
    /* Base(5)*/ uniqueId: PropTypes.string.isRequired,
    flag: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    creatorId: PropTypes.string.isRequired,
    /* Common(2)*/ rate: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
    /* user(2)*/ username: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    /* point(4)*/ reviewType: PropTypes.string.isRequired,
    restaurantId: PropTypes.string,
    eventId: PropTypes.string,
    recipeId: PropTypes.string,
});

export const reviewsPropTypes = PropTypes.objectOf(
    PropTypes.shape({
        /** The time the emoji was added */
        id: PropTypes.string,

        /** All the users who have added this emoji */
        item: reviewPropTypes,
    }),
);
