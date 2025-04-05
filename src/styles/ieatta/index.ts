/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type {LineLayer} from 'react-map-gl';
import type {AnimatableNumericValue, Animated, ImageStyle, TextStyle, ViewStyle} from 'react-native';
import TailwindColors from '@styles/tailwindcss/colors';
import FontUtils from '@styles/utils/FontUtils';
// eslint-disable-next-line no-restricted-imports
import sizing from '@styles/utils/sizing';
import variables from '@styles/variables';

type Styles = Record<
    string,
    | ViewStyle
    | TextStyle
    | ImageStyle
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | ((...args: any[]) => ViewStyle | TextStyle | ImageStyle)
>;

/**
 * Sizing utility styles with Bootstrap inspired naming.
 *
 * https://getbootstrap.com/docs/5.0/utilities/sizing/
 */
export default {
    /**
     * Ieatta's Positioning
     */
    t2: {
        top: 8,
    },
    pInset: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    /**
     * Ieatta's Spacing
     */

    pr25: {
        paddingRight: 100,
    },
    mt15: {
        marginTop: 60,
    },
    pv8: {
        paddingVertical: 32,
    },
    mh12: {
        marginHorizontal: 48,
    },

    /**
     * Ieatta's Sizing
     */

    w90: {
        width: '90%',
    },
    h80: {
        height: '80%',
    },
    h70: {
        height: '70%',
    },
    h40: {
        height: '40%',
    },

    /**
     * Ieatta styles
     * @param colorScheme
     */

    // sectionComponentContainer: {
    // background: theme.componentBG,
    // },

    searchRestaurantInputStyle: {
        // color: theme.textSupporting,
        fontSize: variables.fontSizeNormal,
        lineHeight: variables.fontSizeNormalHeight,
    },

    sectionTitleMobileStrong: {
        ...FontUtils.fontFamily.platform.EXP_NEUE,
        fontSize: variables.fontSizeSectionMobileTitle,
        lineHeight: variables.lineHeightXLarge,
    },

    sectionTitleWebStrong: {
        ...FontUtils.fontFamily.platform.EXP_NEUE,
        fontSize: variables.fontSizeSectionWebTitle,
        lineHeight: variables.lineHeightXLarge,
    },

    sectionInfoNormal: {
        ...FontUtils.fontFamily.platform.EXP_NEUE,
        fontSize: variables.fontSizeLabel,
        lineHeight: variables.lineHeightNormal,
    },

    rowContainerInSidebar: {
        // backgroundColor: theme.componentBG,
        width: '100%',
        height: 120,
    },

    /**
     * Ieatta restaurant card view on the small screen
     */
    restaurantCardContainer: {
        borderRadius: 16,
        // backgroundColor: theme.componentBG,
    },
    streetTextInRestaurantItem: {
        // color: theme.textSupporting,
        textAlign: 'left',
    },
    ratingIconInRestaurantItem: {
        width: 146,
        height: 17,
    },

    /**
     * Ieatta header panel on the small screen
     */
    headerPanelMobile: {
        // backgroundColor: theme.componentBG,
    },
    editTextInHeaderPanel: {
        color: TailwindColors.blue500,
    },
    restaurantTitleInHeaderPanel: {
        fontSize: 28,
        fontWeight: '700',
        // color: TailwindColors.black,
    },
    recipePriceTitleInHeaderPanel: {
        fontSize: 28,
        fontWeight: '700',
        // color: theme.textSupporting,
    },
    recipePriceTitleInHeaderWebPanel: {
        fontSize: 28,
        fontWeight: '700',
        // color: TailwindColors.orange500,
    },
    restaurantAndRecipeTitleInHeaderWebPanel: {
        fontSize: 48,
        fontWeight: '700',
        color: TailwindColors.white,
    },
    updatedDateInHeaderWebPanel: {
        color: TailwindColors.blue500,
        textAlign: 'left',
        fontWeight: '700',
    },
    restaurantAddressInHeaderWebPanel: {
        color: TailwindColors.white,
    },
    reviewCountInHeaderWebPanel: {
        color: TailwindColors.white,
    },
    eventWebInfoPanel: {
        height: 420,
    },
    eventLeftPanelBorderInWebHeaderPanel: {
        borderWidth: 1,
        borderRadius: 5,
        // borderColor: theme.border,
    },
    eventTitleInHeaderPanel: {
        fontSize: 16,
        fontWeight: '500',
        color: TailwindColors.gray500,
    },
    restaurantTitleInWebHeaderPanel: {
        fontSize: 12,
        fontWeight: '700',
        color: TailwindColors.black,
    },
    eventTitleInWebHeaderPanel: {
        fontSize: 22,
        fontWeight: '700',
    },
    restaurantNoteInHeaderPanel: {
        // color: theme.textSupporting,
    },
    actionsBarInHeaderPanel: {
        height: 45,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
    },
    actionRowInHeaderPanel: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: '100%',
    },
    actionTitleInHeaderPanel: {
        fontWeight: '600',
        // fontFamily: FontFamily.interSemiBold,
        marginLeft: 9,
        textAlign: 'left',
        color: TailwindColors.blue500,
        // fontSize: FontSize.size_base,
    },

    /**
     * Add recipe item
     */
    leftImageWrapperInSelectionListItem: {
        width: 100,
        height: '100%',
    },

    leftUserImageWrapperInSelectionListItem: {
        width: 70,
        height: '100%',
    },

    /**
     * drop down
     */
    dropDownButtonArrowContain: {
        marginLeft: 12,
        marginRight: 14,
    },

    /**
     * Google Button
     */
    signInGoogleLogoIcon: {
        width: 24,
        height: 24,
    },

    signInGoogleLogoText: {
        // color: theme.textSupporting,
    },

    /**
     * rating Icons
     */
    ratingIconInHeaderPanel: {
        width: 146,
        height: 17,
    },
    ratingIconInHeaderWebPanel: {
        width: 202,
        height: 28,
    },
    ratingIconInPhotosHeaderPanel: {
        width: 146,
        height: 17,
    },

    /**
     * Floating Action Button on the sidebar
     */
    floatingActionButtonContainer: {
        position: 'absolute',
        right: 20,

        // The bottom of the floating action button should align with the bottom of the compose box.
        // The value should be equal to the height + marginBottom + marginTop of chatItemComposeSecondaryRow
        bottom: variables.fabBottom,
    },

    /**
     * Photos Page
     */
    restaurantMenuNativeItem: {
        width: variables.menuInRestaurantMobileItemWidth,
        height: variables.menuInRestaurantMobileItemHeight,
    },
    restaurantMenuWebItem: {
        width: variables.menuInRestaurantWebItemWidth,
        height: variables.menuInRestaurantWebItemHeight,
    },

    /**
     * old Search styles
     */
    searchPressable: {
        height: variables.componentSizeNormal,
    },

    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 24,
        // backgroundColor: theme.hoverComponentBG,
        borderRadius: variables.componentBorderRadiusRounded,
        justifyContent: 'center',
    },

    searchContainerHovered: {
        // backgroundColor: theme.border,
    },

    searchInputStyleOld: {
        // color: theme.textSupporting,
        fontSize: 13,
        lineHeight: 16,
    },

    textInputLabelDesktop: {
        transformOrigin: 'left center',
    },

    receiptViewTextContainer: {
        paddingHorizontal: 40,
        ...sizing.w100,
    },
    textReceiptUpload: {
        // ...headlineFont,
        fontSize: variables.fontSizeXLarge,
        // color: theme.text,
        textAlign: 'center',
    },

    subTextReceiptUpload: {
        // fontFamily: FontUtils.fontFamily.platform.EXP_NEUE,
        lineHeight: variables.lineHeightLarge,
        textAlign: 'center',
        // color: theme.text,
    },

    /**
     * Photos Page on the native
     */
    takePhotosOfflineText: {
        width: 35,
        height: 35,
        backgroundColor: TailwindColors.red400,
        borderRadius: 35,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: TailwindColors.white,
    },
    /**
     * Photos Page on the native
     */
    count: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 75,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    } as ViewStyle,
    countText: {
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: {
            width: 0,
            height: 0.5,
        },
        textShadowRadius: 0,
    } as TextStyle,
} satisfies Styles;
