import React, {useMemo, useState} from 'react';
import FullPageNotFoundView from '@components/BlockingViews/FullPageNotFoundView';
import FullScreenLoadingIndicator from '@components/FullscreenLoadingIndicator';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import * as Expensicons from '@components/Icon/Expensicons';
import IconWithTooltip from '@components/Ieatta/components/IconWithTooltip';
import BasePhotosGridList from '@components/Ieatta/components/PhotosGrid/BasePhotosGridList';
import ScreenWrapper from '@components/ScreenWrapper';
import useLocalize from '@hooks/useLocalize';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import useThemeStyles from '@hooks/useThemeStyles';
import {ParseModelEvents} from '@libs/FirebaseIeatta/appModel';
import {FBCollections, PhotoType} from '@libs/FirebaseIeatta/constant';
import {PageSection, RowPressableType} from '@libs/FirebaseIeatta/list/constant';
import type {IPageRow} from '@libs/FirebaseIeatta/list/types/page-row';
import type {IPhotoCarouselItemRow, OnCarouselItemPressed} from '@libs/FirebaseIeatta/list/types/rows/photo';
import FirebaseHelper from '@libs/FirebaseIeatta/services/firebase-helper';
import * as ShowNotify from '@libs/ieatta/Notify';
import Navigation from '@libs/Navigation/Navigation';
import TailwindColors from '@styles/tailwindcss/colors';
import variables from '@styles/variables';
import ROUTES from '@src/ROUTES';
import type {IFBEvent, IFBPhoto, IFBSqlPhoto, IFBUser} from '@src/types/firebase';

type BaseAddWaitersPageProps = {
    restaurantId: string;
    eventId: string;
    event: IFBEvent | undefined;
    waitersInRestaurant: IFBPhoto[];
};

function BaseAddWaitersPage({restaurantId, eventId, event, waitersInRestaurant}: BaseAddWaitersPageProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();
    // eslint-disable-next-line rulesdir/prefer-shouldUseNarrowLayout-instead-of-isSmallScreenWidth
    const {isSmallScreenWidth} = useResponsiveLayout();

    const waitersArray: string[] = event != undefined ? ParseModelEvents.getWaiterIds(event) : [];

    // eslint-disable-next-line rulesdir/no-negated-variables
    const shouldShowNotFoundView = false;
    const shouldShowLoading = false;

    const onCarouselItemPressed: OnCarouselItemPressed = (photo: IFBPhoto, isSelected: boolean) => {
        const {uniqueId: waiterId} = photo;

        let nextModel = event;

        if (event === null || event === undefined) {
            return;
        }
        if (isSelected) {
            nextModel = ParseModelEvents.removeWaiter({
                model: {...event},
                waiterId,
            });
        } else {
            nextModel = ParseModelEvents.addWaiter({
                model: {...event},
                waiterId,
            });
        }
        new FirebaseHelper()
            .setData({
                path: FBCollections.Events,
                model: nextModel,
            })
            .then(() => {})
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {});
    };

    const generatePageRow = (item: IFBPhoto | IFBSqlPhoto, itemWidth: number, itemHeight: number): IPageRow => {
        const photo = item as IFBPhoto;
        const carouselItem: IPhotoCarouselItemRow = {
            relatedId: '',
            photoType: '',
            photo,
            containerWidth: itemWidth,
            photoWidth: itemWidth,
            photoHeight: itemHeight,
            section: {
                isSelected: waitersArray.includes(photo.uniqueId),
                onItemPressed: onCarouselItemPressed,
            },
        };

        return {
            rowType: PageSection.PHOTO_ADD_WAITERS_ITEM_WITH_EVENT,
            rowData: carouselItem,
            rowKey: 'PageSection.PHOTO_ADD_WAITERS_ITEM_WITH_EVENT<Photo-Grid>',
            modalName: 'waiter',
            pressType: RowPressableType.SINGLE_PRESS,
        };
    };

    return (
        <ScreenWrapper
            includeSafeAreaPaddingBottom={false}
            shouldEnablePickerAvoiding={false}
            shouldEnableMaxHeight
            testID={BaseAddWaitersPage.displayName}
        >
            <FullPageNotFoundView
                onBackButtonPress={() => Navigation.goBack()}
                shouldShow={shouldShowNotFoundView}
                subtitleKey="workspace.common.notAuthorized"
            >
                <HeaderWithBackButton title={translate('add.waiter.title')}>
                    <IconWithTooltip
                        toolTip="photos.takePhoto.button.waiter"
                        onPress={() => {
                            Navigation.navigate(ROUTES.TAKE_PHOTO.getRoute({photoType: PhotoType.Waiter, relatedId: restaurantId}));
                        }}
                        testID="Take photo for waiter"
                        containerStyle={[styles.mr2]}
                        iconFill={TailwindColors.blue500}
                        iconSrc={Expensicons.Camera}
                    />
                </HeaderWithBackButton>

                {shouldShowLoading ? (
                    <FullScreenLoadingIndicator style={[styles.flex1, styles.pRelative]} />
                ) : (
                    <BasePhotosGridList
                        initialPanelWidth={variables.sideBarWidth - 80}
                        isCoverPage
                        photos={waitersInRestaurant}
                        generatePageRow={generatePageRow}
                    />
                )}
            </FullPageNotFoundView>
        </ScreenWrapper>
    );
}

BaseAddWaitersPage.displayName = 'BaseAddWaitersPage';

export default BaseAddWaitersPage;
