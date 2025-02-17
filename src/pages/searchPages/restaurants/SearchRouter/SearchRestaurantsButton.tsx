import React from 'react';
import type {StyleProp, ViewStyle} from 'react-native';
import {View} from 'react-native';
import Hoverable from '@components/Hoverable';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import {PressableWithoutFeedback} from '@components/Pressable';
import Text from '@components/Text';
import Tooltip from '@components/Tooltip';
import useLocalize from '@hooks/useLocalize';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import Performance from '@libs/Performance';
import variables from '@styles/variables';
import * as Session from '@userActions/Session';
import Timing from '@userActions/Timing';
import CONST from '@src/CONST';
import {useSearchRestaurantsRouterContext} from './SearchRestaurantsRouterContext';

type SearchRestaurantsButtonProps = {
    style?: StyleProp<ViewStyle>;
    showAsButton?: boolean;
};

function SearchRestaurantsButton({style, showAsButton = true}: SearchRestaurantsButtonProps) {
    const styles = useThemeStyles();
    const theme = useTheme();
    const {translate} = useLocalize();
    const {openSearchRestaurantsRouter} = useSearchRestaurantsRouterContext();

    return (
        <Tooltip text={translate('common.search')}>
            <PressableWithoutFeedback
                accessibilityLabel={translate('common.search')}
                style={[styles.flexRow, styles.touchableButtonImage, style]}
                onPress={Session.checkIfActionIsAllowed(() => {
                    // Timing.start(CONST.TIMING.SEARCH_ROUTER_RENDER);
                    // Performance.markStart(CONST.TIMING.SEARCH_ROUTER_RENDER);

                    openSearchRestaurantsRouter();
                })}
            >
                {showAsButton ? (
                    <Icon
                        src={Expensicons.MagnifyingGlass}
                        fill={theme.icon}
                    />
                ) : (
                    <Hoverable>
                        {(hovered: boolean) => (
                            // <View style={[styles.searchContainer, hovered && styles.searchContainerHovered, style]}>
                            <View style={[styles.searchContainer, styles.backgroundHoverComponentBG, hovered && styles.backgroundBorder, style]}>
                                <Icon
                                    src={Expensicons.MagnifyingGlass}
                                    width={variables.iconSizeSmall}
                                    height={variables.iconSizeSmall}
                                    fill={theme.icon}
                                />
                                <Text
                                    style={styles.searchInputStyle}
                                    numberOfLines={1}
                                >
                                    {translate('headerPanel.search.buttonSearch')}
                                </Text>
                            </View>
                        )}
                    </Hoverable>
                )}
            </PressableWithoutFeedback>
        </Tooltip>
    );
}

SearchRestaurantsButton.displayName = 'SearchRestaurantsButton';

export default SearchRestaurantsButton;
