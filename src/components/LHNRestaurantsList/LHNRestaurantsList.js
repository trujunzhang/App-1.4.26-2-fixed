// import {FlashList as RestaurantList} from '@shopify/flash-list';
import PropTypes from 'prop-types';
import React, {useCallback, useMemo} from 'react';
import {FlatList as RestaurantList, View} from 'react-native';
import {withOnyx} from 'react-native-onyx';
import _ from 'underscore';
import PageFlashListItemWithEvent from '@components/Ieatta/detailedPage/PageFlashListItemWithEvent';
import participantPropTypes from '@components/participantPropTypes';
import withCurrentRestaurantID, {withCurrentRestaurantIDDefaultProps, withCurrentRestaurantIDPropTypes} from '@components/withCurrentRestaurantID';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import compose from '@libs/compose';
import {buildRestaurantSidebar} from '@libs/Firebase/list/builder/restaurant';
import {restaurantPropTypes} from '@pages/proptypes';
import stylePropTypes from '@styles/stylePropTypes';
import variables from '@styles/variables';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import RestaurantRowLHNData from './RestaurantRowLHNData';

const propTypes = {
    /** Wrapper style for the section list */
    style: stylePropTypes,

    /** Extra styles for the section list container */
    contentContainerStyles: stylePropTypes.isRequired,

    /** Sections for the section list */
    listItems: PropTypes.arrayOf(restaurantPropTypes).isRequired,

    /** Callback to fire when a row is selected */
    onSelectRow: PropTypes.func.isRequired,

    /** Callback to fire to load more restaurants */
    fetchMoreRestaurants: PropTypes.func.isRequired,

    /** Toggle between compact and default view of the option */
    optionMode: PropTypes.oneOf(_.values(CONST.OPTION_MODE)).isRequired,

    /** Whether to allow option focus or not */
    shouldDisableFocusOptions: PropTypes.bool,

    /** List of users' personal details */
    personalDetails: PropTypes.objectOf(participantPropTypes),

    ...withCurrentRestaurantIDPropTypes,
};

const defaultProps = {
    style: undefined,
    shouldDisableFocusOptions: false,
    personalDetails: {},
};

const keyExtractor = (item) => `row_${item.rowKey}`;

function LHNRestaurantsList({style, contentContainerStyles, listItems, onSelectRow, fetchMoreRestaurants, optionMode, shouldDisableFocusOptions, personalDetails, currentRestaurantID}) {
    const {isSmallScreenWidth} = useWindowDimensions();
    const styles = useThemeStyles();

    const listContentContainerStyle = useMemo(() => {
        if (isSmallScreenWidth) {
            return {backgroundColor: 'transparent', paddingHorizontal: 20};
        }
        return {backgroundColor: 'transparent', paddingHorizontal: 8, paddingVertical: 4};
        // Listen parentRestaurantAction to update title of thread report when parentRestaurantAction changed
        // Listen to transaction to update title of transaction report when transaction changed
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSmallScreenWidth]);

    // /**
    //  * Function which renders a row in the list
    //  *
    //  * @param {Object} params
    //  * @param {Object} params.item
    //  *
    //  * @return {Component}
    //  */
    // const renderItem = useCallback(
    //     ({item: restaurant}) => {
    //         return (
    //             <View key={restaurant.uniqueId}>
    //                 <RestaurantRowLHNData
    //                     restaurant={restaurant}
    //                     viewMode={optionMode}
    //                     isFocused={!shouldDisableFocusOptions && restaurant.uniqueId === currentRestaurantID}
    //                     onSelectRow={onSelectRow}
    //                 />
    //             </View>
    //         );
    //     },
    //     [currentRestaurantID, onSelectRow, optionMode, shouldDisableFocusOptions],
    // );

    // Log.info('data:' + data.length)

    const rowsData = useMemo(
        () =>
            buildRestaurantSidebar(isSmallScreenWidth, {
                restaurants: listItems,
                currentRestaurantID,
            }),
        [isSmallScreenWidth, listItems, currentRestaurantID],
    );

    return (
        <View style={style || styles.flex1}>
            <RestaurantList
                indicatorStyle="white"
                keyboardShouldPersistTaps="always"
                contentContainerStyle={{...contentContainerStyles, ...listContentContainerStyle}}
                data={rowsData}
                testID="sidebar-restaurants-list"
                keyExtractor={keyExtractor}
                renderItem={({item}) => {
                    return <PageFlashListItemWithEvent item={item} />;
                }}
                extraData={[currentRestaurantID]}
                showsVerticalScrollIndicator={false}
                estimatedItemSize={variables.optionRowHeight}
                onEndReachedThreshold={2.2}
                onEndReached={fetchMoreRestaurants}
                ItemSeparatorComponent={() => <View style={{height: isSmallScreenWidth ? 18 : 12}} />}
            />
        </View>
    );
}

LHNRestaurantsList.propTypes = propTypes;
LHNRestaurantsList.defaultProps = defaultProps;
LHNRestaurantsList.displayName = 'LHNRestaurantsList';

// eslint-disable-next-line rulesdir/no-useless-compose
export default compose(
    withCurrentRestaurantID,
    withOnyx({
        personalDetails: {
            key: ONYXKEYS.PERSONAL_DETAILS_LIST,
        },
    }),
)(LHNRestaurantsList);
