/* eslint-disable rulesdir/prefer-underscore-method */
import React, {useState} from 'react';
import SectionMenuEmptyView from '@components/Ieatta/detailedPage/common/SectionPhotoEmptyView';
import RestaurantInfoPanel from '@components/Ieatta/detailedPage/header/RestaurantInfoPanel';
import RestaurantWithPhotosInfoPanel from '@components/Ieatta/detailedPage/header/RestaurantWithPhotosInfoPanel';
import RestaurantMenuNativeView from '@components/Ieatta/detailedPage/restaurant/menu/RestaurantMenuNativeView';
import RestaurantMenuWebView from '@components/Ieatta/detailedPage/restaurant/menu/RestaurantMenuWebView';
import {photos} from '@libs/FirebaseIeatta/data/Photos';
import {recipes} from '@libs/FirebaseIeatta/data/Recipes';
import {restaurants} from '@libs/FirebaseIeatta/data/Restaurants';
import variables from '@styles/variables';

/**
 * We use the Component Story Format for writing stories. Follow the docs here:
 *
 * https://storybook.js.org/docs/react/writing-stories/introduction#component-story-format
 */
const story = {
    title: 'Components/DetailedRestaurant',
    component: RestaurantInfoPanel,
};

const photosInRestaurant = photos.slice(3, 15);
const photosWithPlaceholderInRestaurant = photos.slice(3, 4);
const restaurant = restaurants[0];
const recipe = recipes[0];

function MobileInfoPanel(args) {
    const [value, setValue] = useState('');
    return (
        <div
            style={{
                width: 500,
            }}
        >
            <RestaurantInfoPanel restaurant={restaurant} />
        </div>
    );
}

MobileInfoPanel.args = {};

function WebInfoPanel(args) {
    const [value, setValue] = useState('');
    return (
        <div
            style={{
                width: 800,
            }}
        >
            <RestaurantWithPhotosInfoPanel
                photos={photosInRestaurant}
                restaurant={restaurant}
            />
        </div>
    );
}

WebInfoPanel.args = {};

function WebInfoWithPlaceholderPanel(args) {
    const [value, setValue] = useState('');
    return (
        <div
            style={{
                width: 800,
            }}
        >
            <RestaurantWithPhotosInfoPanel
                photos={[]}
                restaurant={restaurant}
            />
        </div>
    );
}

WebInfoWithPlaceholderPanel.args = {};

function WebInfoWithLimitPlaceholderPanel(args) {
    const [value, setValue] = useState('');
    return (
        <div
            style={{
                width: 800,
            }}
        >
            <RestaurantWithPhotosInfoPanel
                photos={photosWithPlaceholderInRestaurant}
                restaurant={restaurant}
            />
        </div>
    );
}

WebInfoWithLimitPlaceholderPanel.args = {};

function MobileMenuView(args) {
    const [value, setValue] = useState('');
    return (
        <div
            style={{
                width: variables.menuInRestaurantMobileItemWidth,
                height: variables.menuInRestaurantMobileItemHeight,
            }}
        >
            <RestaurantMenuNativeView recipe={recipe} />
        </div>
    );
}

MobileMenuView.args = {};

function WebMenuView(args) {
    const [value, setValue] = useState('');
    return (
        <div
            style={{
                width: variables.menuInRestaurantWebItemWidth,
                height: variables.menuInRestaurantWebItemHeight,
            }}
        >
            <RestaurantMenuWebView recipe={recipe} />
        </div>
    );
}

WebMenuView.args = {};

const isSmallScreenWidth = true;

function EmptyMenuView(args) {
    const [value, setValue] = useState('');
    return (
        <div
            style={{
                width: 1000,
                height: isSmallScreenWidth ? variables.menuInRestaurantMobileItemHeight : variables.menuInRestaurantWebItemHeight,
            }}
        >
            <SectionMenuEmptyView isSmallScreenWidth={isSmallScreenWidth} />
        </div>
    );
}

EmptyMenuView.args = {};

export default story;
export {MobileInfoPanel, WebInfoPanel, WebInfoWithPlaceholderPanel, WebInfoWithLimitPlaceholderPanel, MobileMenuView, WebMenuView, EmptyMenuView};
