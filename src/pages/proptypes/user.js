/* eslint-disable rulesdir/no-inline-named-export */

/* eslint-disable spaced-comment */
import PropTypes from 'prop-types';

export const userPropTypes = PropTypes.shape({
    /* Base(3)*/
    id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    /* Common(3)*/
    username: PropTypes.string.isRequired,
    /** First name of the current user from their personal details */
    firstName: PropTypes.string.isRequired,
    /** Last name of the current user from their personal details */
    lastName: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    /* This can be either "light", "dark" or "system"*/
    /* The theme setting set by the user in preferences.*/
    preferredTheme: PropTypes.oneOf(['light', 'dark', 'system']).isRequired,
    /** Indicates which locale should be used */
    preferredLocale: PropTypes.string.isRequired,
    /* Property(3)*/
    loginType: PropTypes.string.isRequired,
    originalUrl: PropTypes.string,
    thumbnailUrl: PropTypes.string,
});

export const usersPropTypes = PropTypes.objectOf(
    PropTypes.shape({
        /** The time the emoji was added */
        id: PropTypes.string,

        /** All the users who have added this emoji */
        item: userPropTypes,
    }),
);
