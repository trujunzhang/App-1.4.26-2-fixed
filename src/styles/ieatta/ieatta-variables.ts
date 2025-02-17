import {PixelRatio} from 'react-native';

/**
 * Calculate the fontSize, lineHeight and padding when the device font size is changed, In most cases users do not change their device font size so PixelRatio.getFontScale() = 1 and this
 * method always returns the defaultValue (first param). When the device font size increases/decreases, the PixelRatio.getFontScale() value increases/decreases as well.
 * This means that if you have text and its 'fontSize' is 19, the device font size changed to the 5th level on the iOS slider and the actual fontSize is 19 * PixelRatio.getFontScale()
 * = 19 * 1.11 = 21.09. Since we are disallowing font scaling we need to calculate it manually. We calculate it with: PixelRatio.getFontScale() * defaultValue > maxValue ? maxValue :
 * defaultValue * PixelRatio.getFontScale() This means that the fontSize is increased/decreased when the device font size changes up to maxValue (second param)
 */
function getValueUsingPixelRatio(defaultValue: number, maxValue: number): number {
    return PixelRatio.getFontScale() * defaultValue > maxValue ? maxValue : defaultValue * PixelRatio.getFontScale();
}

export default {
    // page footers
    footerImageDesktopWidth: 500,
    footerImageDesktopHeight: 100,

    // restaurant header panel
    detailedHeaderPhotoCarouselItemWidth: 375,
    detailedHeaderPhotoCarouselItemHeight: 300,

    iconSizeYelpLogoWidth: 60,
    iconSizeYelpLogoHeight: 30,
    iconMenuSizeWidth: 32,
    iconMenuSizeHeight: 25,

    // photo grid
    maxWidthInPhotosGridAndPage: 1440,
    photoGridItemMobileWidth: 215,
    photoGridItemMobileHeight: 245,
    photoGridItemWebWidth: 275,
    photoGridItemWebHeight: 315,
    photoGridItemCoverWidth: 100,
    photoGridItemCoverHeight: 135,

    popoverPhotoCarouselItemWidth: 600,
    popoverPhotoCarouselItemHeight: 500,
    popoverPhotoUserInfoWidth: 400,

    restaurantCardViewPhoneHeight: 400,
    restaurantCardViewTableHeight: 600,
    restaurantRowViewWidth: 120,

    // menu items in the restaurant
    menuInRestaurantMobileItemWidth: 150,
    menuInRestaurantMobileItemHeight: 180,
    menuInRestaurantWebItemWidth: 248,
    menuInRestaurantWebItemHeight: 268,

    // photo items in the detailed page
    photoInRestaurantMobileItemWidth: 160,
    photoInRestaurantMobileItemHeight: 180,

    detailedHeaderArrowWidth: 36,
    detailedHeaderArrowHeight: 36,

    popoverHeaderHeight: getValueUsingPixelRatio(35, 50),

    // pagination limit length
    paginationLimitInSidebar: 5,
    paginationLimitInDetailedReviews: 4,

    buttonBorderInPagedHeaderRadius: 12,

    fontSizeSectionMobileTitle: getValueUsingPixelRatio(17, 20),
    fontSizeSectionWebTitle: getValueUsingPixelRatio(22, 20),
} as const;
