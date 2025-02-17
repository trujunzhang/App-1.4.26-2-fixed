import lodashGet from 'lodash/get';
import React from 'react';
import {View} from 'react-native';
import Avatar from '@components/Avatar';
import DisplayNames from '@components/DisplayNames';
import * as Expensicons from '@components/Icon/Expensicons';
import IconWithTooltip from '@components/Ieatta/components/IconWithTooltip';
import IeattaUserDetailsTooltip from '@components/Ieatta/detailedPage/common/IeattaUserDetailsTooltip';
import * as DetailedPageActionContextMenu from '@components/Ieatta/detailedPage/ContextMenu/DetailedPageActionContextMenu';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import {FBCollections} from '@libs/FirebaseIeatta/constant';
import type {IPageRow} from '@libs/FirebaseIeatta/list/types/page-row';
import FirebaseHelper from '@libs/FirebaseIeatta/services/firebase-helper';
import Navigation from '@libs/Navigation/Navigation';
import TailwindColors from '@styles/tailwindcss/colors';
import CONST from '@src/CONST';
import ROUTES from '@src/ROUTES';
import type {IFBPeopleInEvent} from '@src/types/firebase';
import type {PersonalDetails} from '@src/types/onyx';

type OrderedUserRowProps = {
    pageRow: IPageRow;
    peopleInEvent: IFBPeopleInEvent;
    user: PersonalDetails;
    recipesCount: number;
};

function OrderedUserRow({peopleInEvent, user, recipesCount, pageRow: selection}: OrderedUserRowProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const addButton = (
        <IconWithTooltip
            toolTip="add.recipe.button"
            onPress={() => {
                Navigation.navigate(
                    ROUTES.ADD_RECIPES_IN_EVENT.getRoute({
                        restaurantId: peopleInEvent.restaurantId,
                        peopleInEventId: peopleInEvent.uniqueId,
                    }),
                );
            }}
            testID="Add User Icon"
            containerStyle={[styles.mr2]}
            iconFill={TailwindColors.red500}
            iconSrc={Expensicons.Plus}
        />
    );

    const removeButton = (
        <IconWithTooltip
            toolTip="remove.orderedUser.button"
            onPress={() => {
                DetailedPageActionContextMenu.showDeleteModal(
                    selection,
                    true,
                    () => {},
                    () => {},
                );
            }}
            testID="Delete User Icon"
            containerStyle={[styles.mr2]}
            iconFill={TailwindColors.gray600}
            iconSrc={Expensicons.Trashcan}
        />
    );

    return (
        <View style={[styles.flexRow, styles.alignItemsCenter, styles.justifyContentBetween, styles.sidebarLink, styles.sidebarLinkInnerLHN]}>
            <View style={[styles.chatLinkRowPressable, styles.flexGrow1, styles.optionItemAvatarNameWrapper, styles.optionRow, styles.justifyContentCenter]}>
                <View style={[styles.flexRow, styles.alignItemsCenter]}>
                    <IeattaUserDetailsTooltip userId={lodashGet(user, 'userID', '')}>
                        <View>
                            <Avatar
                                containerStyles={[styles.actionAvatar]}
                                shouldShowAsAvatar
                                avatarUrl={user.avatarThumbnail}
                                type={CONST.ICON_TYPE_AVATAR}
                                name={user.displayName}
                            />
                        </View>
                    </IeattaUserDetailsTooltip>

                    <View style={[styles.ph4, styles.flexColumn]}>
                        <View style={[styles.flexRow, styles.alignItemsCenter, styles.mw100, styles.overflowHidden]}>
                            <IeattaUserDetailsTooltip userId={lodashGet(user, 'userID', '')}>
                                <View>
                                    <DisplayNames
                                        accessibilityLabel={translate('accessibilityHints.chatUserDisplayNames')}
                                        fullTitle={user.displayName ?? ''}
                                        displayNamesWithTooltips={[]}
                                        // displayNamesWithTooltips={optionItem.displayNamesWithTooltips}
                                        tooltipEnabled
                                        numberOfLines={1}
                                        textStyles={[styles.optionDisplayName, styles.optionDisplayNameCompact, styles.pre, styles.fontExtraBold]}
                                        shouldUseFullTitle
                                    />
                                </View>
                            </IeattaUserDetailsTooltip>
                        </View>
                        <View style={[styles.flexRow]}>
                            <Text style={[styles.textLabel]}>{`${recipesCount} Recipes Ordered`}</Text>
                        </View>
                    </View>
                    <View style={[styles.flexRow, styles.alignItemsCenter, styles.gap2]}>
                        {addButton}
                        {removeButton}
                    </View>
                </View>
            </View>
        </View>
    );
}

OrderedUserRow.displayName = 'OrderedUserRow';

export default React.memo(OrderedUserRow);
