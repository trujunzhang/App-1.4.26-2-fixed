/* eslint-disable rulesdir/prefer-underscore-method */
import React, {useState} from 'react';
import RestaurantCardView from '@components/LHNRestaurantsList/RestaurantCardView';
import RestaurantRowView from '@components/LHNRestaurantsList/RestaurantRowView';
import {restaurants} from '@libs/FirebaseIeatta/data/Restaurants';

/**
 * We use the Component Story Format for writing stories. Follow the docs here:
 *
 * https://storybook.js.org/docs/react/writing-stories/introduction#component-story-format
 */
const story = {
    title: 'Components/Restaurant',
    component: RestaurantCardView,
};

const restaurant = restaurants[0];

function Card(args) {
    const [value, setValue] = useState('');
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
            />
        </div>
    );
}

Card.args = {};

function CardWithPlaceholder(args) {
    const [value, setValue] = useState('');
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
            />
        </div>
    );
}

CardWithPlaceholder.args = {};

function Row(args) {
    const [value, setValue] = useState('');
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
            />
        </div>
    );
}

Row.args = {};

function RowWithPlaceholder(args) {
    const [value, setValue] = useState('');
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
            />
        </div>
    );
}

RowWithPlaceholder.args = {};

export default story;
export {Card, CardWithPlaceholder, Row, RowWithPlaceholder};
