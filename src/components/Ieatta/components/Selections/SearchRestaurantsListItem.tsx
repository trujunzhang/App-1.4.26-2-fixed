import React, {useCallback} from 'react';
import {View} from 'react-native';
import * as Ieattaicons from '@components/Icon/Ieattaicons';
import type {ListItem} from '@components/Ieatta/components/SelectionList/types';
import ImagePlaceholder from '@components/ImagePlaceholder';
import BaseListItem from '@components/SelectionList/BaseListItem';
import Text from '@components/Text';
import TextWithTooltip from '@components/TextWithTooltip';
import useLocalize from '@hooks/useLocalize';
import useStyleUtils from '@hooks/useStyleUtils';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import type {IFBRestaurant} from '@src/types/firebase';
import type {SearchRestaurantsItem, SearchRestaurantsItemProps} from './types';

function SearchRestaurantsListItem<TItem extends ListItem>({
    item,
    isFocused,
    showTooltip,
    isDisabled,
    canSelectMultiple,
    onSelectRow,
    onCheckboxPress,
    onDismissError,
    shouldPreventDefaultFocusOnSelectRow,
    rightHandSideComponent,
    onFocus,
    shouldSyncFocus,
}: SearchRestaurantsItemProps<TItem>) {
    const styles = useThemeStyles();
    const theme = useTheme();
    const StyleUtils = useStyleUtils();
    const {translate} = useLocalize();

    const focusedBackgroundColor = styles.sidebarLinkActive.backgroundColor;
    const subscriptAvatarBorderColor = isFocused ? focusedBackgroundColor : theme.sidebar;
    const hoveredBackgroundColor = !!styles.sidebarLinkHover && 'backgroundColor' in styles.sidebarLinkHover ? styles.sidebarLinkHover.backgroundColor : theme.sidebar;

    const handleCheckboxPress = useCallback(() => {
        if (onCheckboxPress) {
            onCheckboxPress(item);
        } else {
            onSelectRow(item);
        }
    }, [item, onCheckboxPress, onSelectRow]);

    const restaurantItem: IFBRestaurant = item as unknown as IFBRestaurant;

    return (
        <BaseListItem
            item={item}
            wrapperStyle={[styles.flex1, styles.flexRow, styles.justifyContentBetween, styles.ph4, isFocused && styles.sidebarLinkActive, styles.mv1]}
            isFocused={isFocused}
            isDisabled={isDisabled}
            showTooltip={showTooltip}
            canSelectMultiple={canSelectMultiple}
            onSelectRow={onSelectRow}
            onDismissError={onDismissError}
            shouldPreventDefaultFocusOnSelectRow={shouldPreventDefaultFocusOnSelectRow}
            rightHandSideComponent={rightHandSideComponent}
            errors={item.errors}
            pendingAction={item.pendingAction}
            FooterComponent={
                item.invitedSecondaryLogin ? (
                    <Text style={[styles.ml9, styles.ph5, styles.pb3, styles.textLabelSupporting]}>
                        {translate('workspace.people.invitedBySecondaryLogin', {secondaryLogin: item.invitedSecondaryLogin})}
                    </Text>
                ) : undefined
            }
            keyForList={item.keyForList}
            onFocus={onFocus}
            shouldSyncFocus={shouldSyncFocus}
        >
            {(hovered?: boolean) => (
                <>
                    <View style={[{width: 70, height: 60}, styles.mr2]}>
                        <View style={[styles.h100, styles.w100]}>
                            <ImagePlaceholder
                                sourceUri={restaurantItem.originalUrl}
                                style={[styles.w100, styles.h100, {borderRadius: 8}]}
                                imageType="png"
                                placeholder={Ieattaicons.PNGBusinessMediumSquare}
                            />
                        </View>
                    </View>
                    <View style={[styles.flex1, styles.flexColumn, styles.justifyContentCenter, styles.alignItemsStretch, styles.optionRow, {gap: 4}]}>
                        <View style={[styles.flexRow, styles.alignItemsCenter]}>
                            <TextWithTooltip
                                shouldShowTooltip={showTooltip}
                                text={restaurantItem.displayName}
                                style={[
                                    styles.optionDisplayName,
                                    isFocused ? styles.sidebarLinkActiveText : styles.sidebarLinkText,
                                    item.isBold !== false && styles.sidebarLinkTextBold,
                                    styles.pre,
                                    item.alternateText ? styles.mb1 : null,
                                ]}
                            />
                        </View>
                        <TextWithTooltip
                            shouldShowTooltip={showTooltip}
                            text={restaurantItem.address}
                            style={[styles.textLabelSupporting, styles.lh16, styles.pre]}
                        />
                    </View>
                    {!!item.rightElement && item.rightElement}
                </>
            )}
        </BaseListItem>
    );
}

SearchRestaurantsListItem.displayName = 'SearchRestaurantsListItem';

export default SearchRestaurantsListItem;
