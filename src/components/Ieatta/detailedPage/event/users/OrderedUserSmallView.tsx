import React from 'react';
import {View} from 'react-native';
import RestaurantMenuList from '@components/Ieatta/detailedPage/restaurant/menu/RestaurantMenuList';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import OrderedUserRow from './OrderedUserRow';
import type {OrderedUserViewProps} from './types';

function OrderedUserSmallView({rowData}: OrderedUserViewProps) {
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

OrderedUserSmallView.displayName = 'OrderedUserSmallView';

export default React.memo(OrderedUserSmallView);
