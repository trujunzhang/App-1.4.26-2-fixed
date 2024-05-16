import {deepEqual} from 'fast-equals';
import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {View} from 'react-native';
import Hoverable from '@components/Hoverable';
import participantPropTypes from '@components/participantPropTypes';
import PressableWithSecondaryInteraction from '@components/PressableWithSecondaryInteraction';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import ControlSelection from '@libs/ControlSelection';
import * as DeviceCapabilities from '@libs/DeviceCapabilities';
import SelectionScraper from '@libs/SelectionScraper';
import Navigation from '@navigation/Navigation';
import {restaurantPropTypes} from '@pages/proptypes';
import CONST from '@src/CONST';
import ROUTES from '@src/ROUTES';
import RestaurantCardView from './RestaurantCardView';
import RestaurantRowView from './RestaurantRowView';

const propTypes = {
    /** Whether row should be focused */
    isFocused: PropTypes.bool,

    /** List of users' personal details */
    personalDetails: PropTypes.objectOf(participantPropTypes),

    /** The preferred language for the app */
    preferredLocale: PropTypes.string,

    /** The policy which the user has access to and which the report could be tied to */
    policy: PropTypes.shape({
        /** The ID of the policy */
        id: PropTypes.string,
        /** Name of the policy */
        name: PropTypes.string,
        /** Avatar of the policy */
        avatar: PropTypes.string,
    }),

    /** The ID of the report that the option is for */
    restaurant: restaurantPropTypes.isRequired,

    /** A function that is called when an option is selected. Selected option is passed as a param */
    onSelectRow: PropTypes.func,
};

const defaultProps = {
    isFocused: false,
    personalDetails: {},
    policy: {},
    preferredLocale: CONST.LOCALES.DEFAULT,
    onSelectRow: () => {},
};

/*
 * This component gets the data from onyx for the actual
 * OptionRowLHN component.
 * The OptionRowLHN component is memoized, so it will only
 * re-render if the data really changed.
 */
function RestaurantRowLHN({isFocused, personalDetails, preferredLocale, policy, ...propsToForward}) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const {isSmallScreenWidth} = useWindowDimensions();

    const popoverAnchorRef = useRef();

    const shouldShowSmallScreen = isSmallScreenWidth;

    const [isContextMenuActive, setIsContextMenuActive] = useState(() => false);

    const restaurant = propsToForward.restaurant;

    /**
     * Show the ReportActionContextMenu modal popover.
     *
     * @param {Object} [event] - A press event.
     */
    const showPopover = useCallback((event) => {
        setIsContextMenuActive(true);
        const selection = SelectionScraper.getCurrentSelection();
        // ReportActionContextMenu.showContextMenu(
        //     CONST.CONTEXT_MENU_TYPES.REPORT_ACTION,
        //     event,
        //     selection,
        //     popoverAnchorRef,
        //     props.report.reportID,
        //     props.action.reportActionID,
        //     originalReportID,
        //     props.draftMessage,
        //     () => setIsContextMenuActive(true),
        //     toggleContextMenuFromActiveReportAction,
        //     ReportUtils.isArchivedRoom(originalReport),
        //     ReportUtils.chatIncludesChronos(originalReport),
        // );
    }, []);

    const itemView = shouldShowSmallScreen ? (
        <RestaurantCardView
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...propsToForward}
            isFocused={isFocused}
            restaurant={restaurant}
        />
    ) : (
        <RestaurantRowView
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...propsToForward}
            isFocused={isFocused}
            restaurant={restaurant}
        />
    );

    return (
        <PressableWithSecondaryInteraction
            ref={popoverAnchorRef}
            style={[styles.pointerEventsAuto]}
            onPressIn={() => isSmallScreenWidth && DeviceCapabilities.canUseTouchScreen() && ControlSelection.block()}
            onPressOut={() => ControlSelection.unblock()}
            onPress={() => {
                Navigation.navigate(ROUTES.RESTAURANT_WITH_ID.getRoute(restaurant.uniqueId));
            }}
            onSecondaryInteraction={showPopover}
            preventDefaultContextMenu
            withoutFocusOnSecondaryInteraction
            accessibilityLabel={translate('accessibilityHints.chatMessage')}
        >
            <Hoverable shouldHandleScroll>{(hovered) => <View style={[hovered && styles.shadowLg]}>{itemView}</View>}</Hoverable>
        </PressableWithSecondaryInteraction>
    );
}

RestaurantRowLHN.propTypes = propTypes;
RestaurantRowLHN.defaultProps = defaultProps;
RestaurantRowLHN.displayName = 'RestaurantRowLHN';

/**
 * This component is rendered in a list.
 * On scroll we want to avoid that a item re-renders
 * just because the list has to re-render when adding more items.
 * Thats also why the React.memo is used on the outer component here, as we just
 * use it to prevent re-renders from parent re-renders.
 */
export default React.memo(RestaurantRowLHN);
