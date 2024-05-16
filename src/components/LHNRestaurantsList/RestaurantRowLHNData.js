import {deepEqual} from 'fast-equals';
import PropTypes from 'prop-types';
import React, {useEffect, useMemo, useRef} from 'react';
import _ from 'underscore';
import participantPropTypes from '@components/participantPropTypes';
import transactionPropTypes from '@components/transactionPropTypes';
import useWindowDimensions from '@hooks/useWindowDimensions';
import * as ReportActionsUtils from '@libs/ReportActionsUtils';
import SidebarUtils from '@libs/SidebarUtils';
import * as TransactionUtils from '@libs/TransactionUtils';
import {restaurantPropTypes} from '@pages/proptypes';
import reportActionPropTypes from '@expPages/home/report/reportActionPropTypes';
import * as Report from '@userActions/Report';
import CONST from '@src/CONST';
import RestaurantRowLHN from './RestaurantRowLHN';

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
function RestaurantRowLHNData({isFocused, personalDetails, preferredLocale, policy, ...propsToForward}) {
    return (
        <RestaurantRowLHN
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...propsToForward}
            isFocused={isFocused}
        />
    );
}

RestaurantRowLHNData.propTypes = propTypes;
RestaurantRowLHNData.defaultProps = defaultProps;
RestaurantRowLHNData.displayName = 'RestaurantRowLHNData';

/**
 * This component is rendered in a list.
 * On scroll we want to avoid that a item re-renders
 * just because the list has to re-render when adding more items.
 * Thats also why the React.memo is used on the outer component here, as we just
 * use it to prevent re-renders from parent re-renders.
 */
export default React.memo(RestaurantRowLHNData);
