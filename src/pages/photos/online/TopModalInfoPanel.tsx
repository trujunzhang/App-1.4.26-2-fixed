/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import lodashGet from 'lodash/get';
import React, {useCallback} from 'react';
import {useDocumentData} from 'react-firebase-hooks/firestore';
import {Image as RNImage, View} from 'react-native';
import Button from '@components/Button';
import * as Ieattaicons from '@components/Icon/Ieattaicons';
import {IeattaStars} from '@components/Icon/IeattaStars';
import Divider from '@components/Ieatta/components/Divider';
import PageFlashListItemWithEvent from '@components/Ieatta/detailedPage/PageFlashListItemWithEvent';
import ImagePlaceholder from '@components/ImagePlaceholder';
import Text from '@components/Text';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import {ParseModelPhotos} from '@libs/FirebaseIeatta/appModel';
import {FBCollections, PhotoType} from '@libs/FirebaseIeatta/constant';
import {PageSection, RowPressableType} from '@libs/FirebaseIeatta/list/constant';
import type {IDisplayNameTitleRow} from '@libs/FirebaseIeatta/list/types/rows/common';
import * as FirebaseQuery from '@libs/FirebaseIeatta/services/firebase-query';
import {calcRateForRestaurant} from '@libs/FirebaseIeatta/utils/rate_utils';
import Navigation from '@libs/Navigation/Navigation';
import Variables from '@styles/variables';
import CONST from '@src/CONST';
import ROUTES from '@src/ROUTES';
import type {IFBEvent, IFBRecipe, IFBRestaurant} from '@src/types/firebase';
import type {TopModalInfoPanelProps} from './types';

function TopModalInfoPanel({relatedId, photoType}: TopModalInfoPanelProps) {
    const styles = useThemeStyles();
    const theme = useTheme();

    const addPhoto = useCallback(() => {
        Navigation.navigate(ROUTES.TAKE_PHOTO.getRoute({relatedId, photoType}));
    }, [photoType, relatedId]);

    const infoPrefix = photoType === PhotoType.Waiter ? 'Waiters' : 'Photos';

    const modelPath = ParseModelPhotos.getCollectionName(photoType);
    const fixedModelPath = photoType === PhotoType.Waiter ? FBCollections.Events : modelPath;

    /**
     |--------------------------------------------------
     | Single(Event)
     |--------------------------------------------------
     */
    const eventId = photoType === PhotoType.Waiter ? relatedId : CONST.IEATTA_MODEL_ID_EMPTY;
    const [event, loadingForEvent, errorForEvent] = useDocumentData<IFBEvent>(
        FirebaseQuery.querySingle({
            path: FBCollections.Events,
            id: eventId,
        }),
    );

    /**
     |--------------------------------------------------
     | Single(Restaurant/Recipe)
     |--------------------------------------------------
     */
    const fixedRelatedId = photoType === PhotoType.Waiter ? event?.restaurantId ?? CONST.IEATTA_MODEL_ID_EMPTY : relatedId;
    const fixedRelatedPath = photoType === PhotoType.Waiter ? FBCollections.Restaurants : modelPath;
    const [relatedModel, loadingForRelatedModel, errorForRelatedModel] = useDocumentData<IFBRestaurant | IFBRecipe>(
        FirebaseQuery.querySingle({
            path: fixedRelatedPath,
            id: fixedRelatedId,
        }),
    );

    switch (photoType) {
        case PhotoType.Waiter:
            if (loadingForEvent) {
                return null;
            }
            break;
        default:
            if (loadingForRelatedModel) {
                return null;
            }
            break;
    }
    const fixedRelatedModel = photoType === PhotoType.Waiter ? event : relatedModel;

    if (fixedRelatedModel === undefined || fixedRelatedModel === null) {
        return null;
    }

    const relatedModelInfo = () => {
        const imageUri = photoType === PhotoType.Waiter ? lodashGet(relatedModel, 'originalUrl', '') : lodashGet(fixedRelatedModel, 'originalUrl', '');
        const rowData: IDisplayNameTitleRow = {
            relatedId: lodashGet(fixedRelatedModel, 'uniqueId', ''),
            modelPath: fixedModelPath,
            fontSize: styles.lg,
            displayName: lodashGet(fixedRelatedModel, 'displayName', ''),
        };

        return (
            <View style={[styles.flexRow, styles.alignItemsCenter, styles.gap3]}>
                <View
                    style={[
                        {
                            width: 48,
                            height: 48,
                            borderRadius: 8,
                            overflow: 'hidden',
                        },
                    ]}
                >
                    <ImagePlaceholder
                        key={imageUri === '' ? fixedRelatedId : imageUri}
                        sourceUri={imageUri}
                        style={[styles.w100, styles.h100]}
                        imageType="png"
                        placeholder={Ieattaicons.PNGBusinessMediumSquare}
                    />
                </View>
                <View style={[styles.flexColumn]}>
                    <PageFlashListItemWithEvent
                        pageRow={{
                            rowKey: 'PageSection.DISPLAY_NAME_TITLE_ROW<Related-Title>',
                            rowType: PageSection.DISPLAY_NAME_TITLE_ROW,
                            rowData,
                            modalName: 'display-name',
                            pressType: RowPressableType.SINGLE_PRESS,
                        }}
                    />
                    <View style={[styles.flexRow, styles.alignItemsCenter, styles.gap2]}>
                        <RNImage
                            style={[styles.ratingIconInPhotosHeaderPanel]}
                            source={IeattaStars.STARS.SMALL[calcRateForRestaurant(lodashGet(fixedRelatedModel, 'rate', 0), lodashGet(fixedRelatedModel, 'reviewCount', 0))]}
                        />
                        <Text style={[]}> {`${lodashGet(fixedRelatedModel, 'reviewCount', 0)} reviews`}</Text>
                    </View>
                </View>
            </View>
        );
    };

    const rightAddPhotoButton = () => {
        if (photoType === PhotoType.Waiter) {
            return null;
        }
        return (
            <View>
                <Button
                    large
                    text="Add photos"
                    icon={Ieattaicons.AddPhoto}
                    iconWidth={Variables.iconSizeNormal}
                    iconHeight={Variables.iconSizeNormal}
                    iconFill={theme.text}
                    onPress={addPhoto}
                />
            </View>
        );
    };

    return (
        <View style={[styles.flexColumn, styles.pt8, styles.pb4, styles.gap2]}>
            <Text style={[styles.fontBold, styles.xl4]}>{`${infoPrefix} for ${fixedRelatedModel.displayName}`}</Text>
            <View style={[styles.flexRow, styles.justifyContentBetween]}>
                {relatedModelInfo()}
                {rightAddPhotoButton()}
            </View>
            <Divider dividerStyle={[styles.mv5]} />
        </View>
    );
}

export default TopModalInfoPanel;
