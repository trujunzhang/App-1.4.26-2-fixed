/* eslint-disable import/prefer-default-export */

/* eslint-disable rulesdir/no-inline-named-export */

/* eslint-disable spaced-comment */
import PropTypes from 'prop-types';

export const restaurantPropTypes = PropTypes.shape({
    /* Base(5)*/
    uniqueId: PropTypes.string.isRequired,
    flag: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    creatorId: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
    /* extra(1)*/
    extraNote: PropTypes.string.isRequired,
    /* Check google(1)*/
    isNew: PropTypes.bool.isRequired,
    /* Location(3)*/
    geoHash: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    /* Common(4)*/
    displayName: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    originalUrl: PropTypes.string.isRequired,
    thumbnailUrl: PropTypes.string.isRequired,
    /* for review(2)*/
    rate: PropTypes.number.isRequired,
    reviewCount: PropTypes.number.isRequired,
    /* Google api(8)*/
    address: PropTypes.string.isRequired,
    street_number: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
    locality: PropTypes.string.isRequired,
    sublocality: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    postal_code: PropTypes.string.isRequired,
    administrative_area: PropTypes.string.isRequired,
});

export const restaurantsPropTypes = PropTypes.objectOf(
    PropTypes.shape({
        /** The time the emoji was added */
        id: PropTypes.string,

        /** All the users who have added this emoji */
        item: restaurantPropTypes,
    }),
);
