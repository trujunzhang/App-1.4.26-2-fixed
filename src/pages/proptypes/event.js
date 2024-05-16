/* eslint-disable import/prefer-default-export */

/* eslint-disable rulesdir/no-inline-named-export */

/* eslint-disable spaced-comment */
import PropTypes from 'prop-types';

export const eventPropTypes = PropTypes.shape({
    /* Base(5)*/
    uniqueId: PropTypes.string.isRequired,
    flag: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    creatorId: PropTypes.string.isRequired,
    /* Common(5+1)*/
    displayName: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    want: PropTypes.string.isRequired,
    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
    waiterIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    /* for review(2)*/
    rate: PropTypes.number.isRequired,
    reviewCount: PropTypes.number.isRequired,
    /* point(1)*/
    restaurantId: PropTypes.string.isRequired,
});

export const eventsPropTypes = PropTypes.objectOf(
    PropTypes.shape({
        /** The time the emoji was added */
        id: PropTypes.string,

        /** All the users who have added this emoji */
        item: eventPropTypes,
    }),
);
