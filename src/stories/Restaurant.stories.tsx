/* eslint-disable rulesdir/prefer-underscore-method */
import React, {useState} from 'react';
import {RestaurantCardView, RestaurantRowView} from '@components/Ieatta/LHNRestaurantsList';
import type {RestaurantItemProps} from '@components/Ieatta/LHNRestaurantsList/type';
import {restaurants} from '@libs/FirebaseIeatta/data/Restaurants';
import type {IFBRestaurant} from '@src/types/firebase';

/**
 * We use the Component Story Format for writing stories. Follow the docs here:
 *
 * https://storybook.js.org/docs/react/writing-stories/introduction#component-story-format
 */
const story = {
    title: 'Components/Restaurant',
    component: RestaurantCardView,
};

const restaurant: IFBRestaurant | undefined = restaurants.at(0);

function Card(args: RestaurantItemProps) {
    const [value, setValue] = useState('');
    if (!restaurant) {
        return null;
    }
    return (
        <div
            style={{
                width: 500,
            }}
        >
            <RestaurantCardView
                rowData={{
                    restaurant,
                    isFocused: false,
                }}
                hovered={false}
            />
        </div>
    );
}

Card.args = {};

function CardWithPlaceholder(args: RestaurantItemProps) {
    const [value, setValue] = useState('');
    if (!restaurant) {
        return null;
    }
    return (
        <div
            style={{
                width: 500,
            }}
        >
            <RestaurantCardView
                rowData={{
                    restaurant: Object.assign(restaurant, {originalUrl: 'http://res.cloudinary.com/di3fvexj8/image/upload/v1507529261/politicl/not_found.jpg'}),
                    isFocused: false,
                }}
                hovered={false}
            />
        </div>
    );
}

CardWithPlaceholder.args = {};

function Row(args: RestaurantItemProps) {
    const [value, setValue] = useState('');
    if (!restaurant) {
        return null;
    }
    return (
        <div
            style={{
                width: 500,
            }}
        >
            <RestaurantRowView
                rowData={{
                    restaurant,
                    isFocused: false,
                }}
                hovered={false}
            />
        </div>
    );
}

Row.args = {};

function RowWithPlaceholder(args: RestaurantItemProps) {
    const [value, setValue] = useState('');
    if (!restaurant) {
        return null;
    }
    return (
        <div
            style={{
                width: 500,
            }}
        >
            <RestaurantRowView
                rowData={{
                    restaurant: Object.assign(restaurant, {originalUrl: 'http://res.cloudinary.com/di3fvexj8/image/upload/v1507529261/politicl/not_found.jpg'}),
                    isFocused: false,
                }}
                hovered={false}
            />
        </div>
    );
}

RowWithPlaceholder.args = {};

export default story;
export {Card, CardWithPlaceholder, Row, RowWithPlaceholder};
