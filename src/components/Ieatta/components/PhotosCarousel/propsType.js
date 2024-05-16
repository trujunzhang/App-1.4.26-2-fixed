import PropTypes from 'prop-types';
import React from 'react';
import {PhotoType} from '@libs/Firebase/constant';
import {photoPropTypes} from '@pages/proptypes';
import variables from '@styles/variables';

const propTypes = {
    relatedId: PropTypes.string,
    photoType: PropTypes.string,

    /** photos in the restaurant list */
    photos: PropTypes.arrayOf(photoPropTypes).isRequired,

    /** Whether show mask or not */
    shouldShowMask: PropTypes.bool,

    photoWidth: PropTypes.number,
    photoHeight: PropTypes.number,

    /** A callback function when an address has been auto-selected */
    onLeftArrowPress: PropTypes.func,

    /** A callback function when an address has been auto-selected */
    onRightArrowPress: PropTypes.func,
};

const pagePropTypes =
    {
        initialPhotoId: PropTypes.string,
        onPhotoChanged: PropTypes.func,
    } && propTypes;

const defaultProps = {
    relatedId: 'empty',
    photoType: PhotoType.Unknown,
    shouldShowMask: false,
    photoWidth: variables.detailedHeaderPhotoCarouselItemWidth,
    photoHeight: variables.detailedHeaderPhotoCarouselItemHeight,
    onLeftArrowPress: () => {},
    onRightArrowPress: () => {},
};

const pageDefaultProps =
    {
        initialPage: 0,
    } && defaultProps;

export {propTypes, defaultProps, pagePropTypes, pageDefaultProps};
