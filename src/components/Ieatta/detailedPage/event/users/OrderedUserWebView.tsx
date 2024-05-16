import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import {Image as RNImage, View} from 'react-native';
import Divider from '@components/Divider';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import {IeattaStars} from '@components/Icon/IeattaStars';
import {EventInfoPanel} from '@components/Ieatta/detailedPage/header';
import RestaurantMenuList from '@components/Ieatta/detailedPage/restaurant/menu/RestaurantMenuList';
import Text from '@components/Text';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import {calcRateForRestaurant} from '@libs/Firebase/utils/rate_utils';
import {StringUtils} from '@libs/Firebase/utils/string_utils';
import TailwindColors from '@styles/tailwindcss/colors';
import variables from '@styles/variables';
import type {IFBEvent, IFBRecipe, IFBRestaurant} from '@src/types/firebase';
import OrderedUserRow from './OrderedUserRow';
import type {OrderedUserViewProps} from './types';

function OrderedUserWebView({rowData}: OrderedUserViewProps) {
    const {peopleInEvent, user, recipes, showDivide} = rowData;
    const styles = useThemeStyles();
    const {isSmallScreenWidth} = useWindowDimensions();

    return (
        <View style={[styles.flexColumn]}>
            <OrderedUserRow
                peopleInEvent={peopleInEvent}
                user={user}
                recipesCount={recipes.length}
            />
            <RestaurantMenuList recipes={recipes} />
        </View>
    );
}

OrderedUserWebView.displayName = 'OrderedUserWebView';

export default React.memo(OrderedUserWebView);
