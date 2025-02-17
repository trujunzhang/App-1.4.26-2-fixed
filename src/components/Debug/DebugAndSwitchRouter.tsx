/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable prettier/prettier */
import {useEffect} from 'react';
import {OnyxCollection, withOnyx} from 'react-native-onyx';
import getRoutePathForDebug from '@libs/getRoutePathForDebug';
import Log from '@libs/Log';
import Navigation from '@navigation/Navigation';
import {eventsPropTypes, peopleInEventsPropTypes, photosPropTypes, recipesPropTypes, restaurantsPropTypes, reviewsPropTypes, usersPropTypes} from '@pages/proptypes';
import Config from '@src/CONFIG';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import type {Route} from '@src/ROUTES';
import ROUTES from '@src/ROUTES';

function getDebugRouteName(): Route {
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
    // const developingRouteName = ROUTES.RECIPE_WITH_ID.route;

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

    // PHOTOS_GRID_VIEW: {
    // const developingRouteName = ROUTES.PHOTOS_GRID_VIEW.route;

    // PHOTOS_PAGE_VIEW: {
    // const developingRouteName = ROUTES.PHOTOS_PAGE_VIEW.route;

    // PHOTOS_PAGE_VIEW: {
    const developingRouteName = ROUTES.EDIT_PHOTO.route;

    return developingRouteName;
}

function DebugAndSwitchRouter(props: any) {
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
            if (routeName !== null && routeName !== undefined) {
                // Navigation.navigate(routeName);
            }
        }, 2000);
    }, [props]);

    return null;
}

DebugAndSwitchRouter.displayName = 'DebugAndSwitchRouter';

export default DebugAndSwitchRouter;
