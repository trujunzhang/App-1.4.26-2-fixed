/* eslint-disable react/require-default-props */

/* eslint-disable react/no-unused-prop-types */
import PropTypes from 'prop-types';
import {useEffect} from 'react';
import {OnyxCollection, withOnyx} from 'react-native-onyx';
import withCurrentReportID from '@components/withCurrentReportID';
import withNavigationFocus from '@components/withNavigationFocus';
import compose from '@libs/compose';
import getRoutePathForDebug from '@libs/getRoutePathForDebug';
import Log from '@libs/Log';
import Navigation from '@navigation/Navigation';
import {eventsPropTypes, peopleInEventsPropTypes, photosPropTypes, recipesPropTypes, restaurantsPropTypes, reviewsPropTypes, usersPropTypes} from '@pages/proptypes';
import reportPropTypes from '@expPages/reportPropTypes';
import Config from '@src/CONFIG';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import ROUTES, {Route} from '@src/ROUTES';
import {PolicyMembers} from '@src/types/onyx';

const propTypes = {
    /** List of reports */
    // eslint-disable-next-line react/no-unused-prop-types
    chatReports: PropTypes.objectOf(reportPropTypes),
};

const defaultProps = {
    chatReports: {},
};

function getDebugRouteName() {
    // const developingRouteName = "settings/preferences";
    // const developingRouteName="settings";
    // const developingRouteName="settings/profile";
    // const developingRouteName="settings/shareCode";
    // const developingRouteName="settings/profile/display-name";
    // const developingRouteName="settings/profile/timezone";
    // const developingRouteName="settings/profile/timezone/select";
    // const developingRouteName="settings/profile/pronouns";
    // const developingRouteName="settings/profile/lounge-access";
    // const developingRouteName="settings/preferences";
    // const developingRouteName="settings/preferences/priority-mode";
    // const developingRouteName="settings/preferences/language";
    // const developingRouteName="settings/preferences/theme";
    // const developingRouteName="settings/workspaces";
    // const developingRouteName="settings/security";
    // const developingRouteName="settings/security/closeAccount";
    // const developingRouteName="settings/about";
    // const developingRouteName="settings/about/app-download-links";
    // const developingRouteName="settings/wallet";

    // REPORT_WITH_ID_DETAILS
    // const developingRouteName="r/:reportID/details";

    /**
     * Detailed pages
     */
    // RESTAURANT_WITH_ID
    // const developingRouteName =ROUTES.RESTAURANT_WITH_ID.route;

    // EVENT_WITH_ID
    // const developingRouteName = ROUTES.EVENT_WITH_ID.route;

    // RECIPE_WITH_ID
    // const developingRouteName = 'm/:recipeId?';

    /**
     * Edit pages
     */
    // EDIT_RESTAURANT: {
    // const developingRouteName = ROUTES.EDIT_RESTAURANT.route;

    // EDIT_EVENT: {
    // const developingRouteName = ROUTES.EDIT_EVENT.route;

    // EDIT_RECIPE: {
    // const developingRouteName = ROUTES.EDIT_RECIPE.route;

    // EDIT_REVIEW: {
    // const developingRouteName = ROUTES.EDIT_REVIEW.route;

    // ADD_RECIPES_IN_EVENT:{
    // const developingRouteName = ROUTES.ADD_RECIPES_IN_EVENT.route;

    // ADD_USERS_IN_EVENT: {
    // const developingRouteName = ROUTES.ADD_USERS_IN_EVENT.route;

    // PHOTOS_PAGE: {
    const developingRouteName = ROUTES.PHOTOS_PAGE.route;

    return developingRouteName;
}

function DebugAndSwitchRouter(props) {
    // console.log("")
    // console.log("================================")
    // console.log("fbUser", props.fbUsers);
    // console.log("================================")
    // console.log("")
    useEffect(() => {
        setTimeout(() => {
            const developingRouteName = getDebugRouteName();
            const routeName = getRoutePathForDebug(developingRouteName, props);
            Log.info('');
            Log.info('================================');
            Log.info(`DebugSwitchRouter: ${developingRouteName} ${routeName}`);
            Log.info('================================');
            Log.info('');
            if (routeName !== null) {
                Navigation.navigate(routeName);
            }
        }, 2000);
    }, [props]);

    return null;
}

DebugAndSwitchRouter.propTypes = propTypes;
DebugAndSwitchRouter.defaultProps = defaultProps;
DebugAndSwitchRouter.displayName = 'DebugAndSwitchRouter';

// eslint-disable-next-line rulesdir/no-useless-compose
export default compose(
    withOnyx({
        chatReports: {
            key: ONYXKEYS.COLLECTION.REPORT,
            initialValue: {},
        },
    }),
)(DebugAndSwitchRouter);
