/* eslint-disable import/prefer-default-export */

/* eslint-disable rulesdir/no-inline-named-export */

/* eslint-disable spaced-comment */
import PropTypes from 'prop-types';

export const photoPropTypes = PropTypes.shape({
    /* Base(5)*/
    uniqueId: PropTypes.string.isRequired,
    flag: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    creatorId: PropTypes.string.isRequired,
    /* user(2)*/
    username: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    /* Common(3)*/
    originalUrl: PropTypes.string.isRequired,
    thumbnailUrl: PropTypes.string.isRequired,
    /* extra*/
    extraNote: PropTypes.string.isRequired,
    /* point(4)*/
    photoType: PropTypes.string.isRequired,
    restaurantId: PropTypes.string,
    recipeId: PropTypes.string,
    userId: PropTypes.string,
    /* offline(1)*/
    /* status: IFBPhotoStatus*/
    /* photo's status*/
    /* longitude: number*/
    /* latitude: number*/
    /* geoHash: string*/
    /* Location(3)*/
    offlinePath: PropTypes.string.isRequired,
});

export const photosPropTypes = PropTypes.objectOf(
    PropTypes.shape({
        /** The time the emoji was added */
        id: PropTypes.string,

        /** All the users who have added this emoji */
        item: photoPropTypes,
    }),
);
