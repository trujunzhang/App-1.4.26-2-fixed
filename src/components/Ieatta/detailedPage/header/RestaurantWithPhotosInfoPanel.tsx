import React from 'react';
import {Image as RNImage, View} from 'react-native';
import Button from '@components/Button';
import {IeattaStars} from '@components/Icon/IeattaStars';
import {PhotoCarouselScrollView} from '@components/Ieatta/components/PhotosCarousel';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import {FBCollections, PhotoType, ReviewType} from '@libs/FirebaseIeatta/constant';
import {calcRateForRestaurant} from '@libs/FirebaseIeatta/utils/rate_utils';
import {formatByTimeAgo} from '@libs/FirebaseIeatta/utils/timeago_helper';
import {navigationToEditRestaurant, navigationToEditReview} from '@libs/ieatta/editFormUtils';
import Navigation from '@libs/Navigation/Navigation';
import TailwindColors from '@styles/tailwindcss/colors';
import variables from '@styles/variables';
import ROUTES from '@src/ROUTES';
import type {IFBPhoto, IFBRestaurant} from '@src/types/firebase';
import ActionBarInInfoPanel from './ActionBarInInfoPanel';

// eslint-disable-next-line rulesdir/no-inline-named-export
export type RestaurantWithPhotosInfoPanelProps = {
    restaurant: IFBRestaurant;
    photos: IFBPhoto[];
};

function RestaurantWithPhotosInfoPanel({restaurant, photos}: RestaurantWithPhotosInfoPanelProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const timeAgo = formatByTimeAgo(restaurant.updatedAt);

    const onSeeAllPhotoPress = () => {
        Navigation.navigate(ROUTES.PHOTOS_GRID_VIEW.getRoute({relatedId: restaurant.uniqueId, photoType: PhotoType.Restaurant}));
    };

    const renderInfo = (
        <View style={[styles.flex1, styles.flexColumn, styles.justifyContentEnd]}>
            <View style={[]}>
                <Text style={[styles.restaurantAndRecipeTitleInHeaderWebPanel]}>{restaurant.displayName}</Text>
                <View style={[styles.flexRow, styles.alignItemsCenter]}>
                    <RNImage
                        style={[styles.ratingIconInHeaderWebPanel, styles.mv3]}
                        source={IeattaStars.STARS.LARGE[calcRateForRestaurant(restaurant.rate, restaurant.reviewCount)]}
                    />
                    <Text style={[styles.ml4, styles.reviewCountInHeaderWebPanel]}>
                        {calcRateForRestaurant(restaurant.rate, restaurant.reviewCount)}
                        {/* {restaurant.rate / restaurant.reviewCount} */}
                        <Text style={[styles.reviewCountInHeaderWebPanel, styles.ml2]}>{`(${restaurant.reviewCount} reviews)`}</Text>
                    </Text>
                </View>
                <View style={[styles.flexRow, styles.alignItemsCenter]}>
                    <Text style={[styles.restaurantAddressInHeaderWebPanel, styles.mr2]}>{restaurant.address}</Text>
                    <Button
                        medium
                        style={[{backgroundColor: TailwindColors.blue500}]}
                        innerStyles={[{backgroundColor: TailwindColors.blue500}]}
                        hoverStyles={[{backgroundColor: TailwindColors.blue700}]}
                        textStyles={[{color: TailwindColors.white}]}
                        text={translate('common.edit')}
                        onPress={() => {
                            navigationToEditRestaurant({restaurantId: restaurant.uniqueId});
                        }}
                    />
                </View>
                <Text style={[styles.updatedDateInHeaderWebPanel, styles.xl]}>{`Updated ${timeAgo}`}</Text>
            </View>
        </View>
    );

    const renderRightSeeAllPhotosButton = (
        <View
            style={[
                styles.pAbsolute,
                {
                    right: 60,
                    bottom: 20,
                },
                {backgroundColor: 'transparent'},
            ]}
        >
            <Button
                large
                style={[
                    {
                        borderRadius: variables.buttonBorderInPagedHeaderRadius,
                    },
                ]}
                innerStyles={[
                    styles.ph4,
                    styles.pv1,
                    {
                        borderRadius: variables.buttonBorderInPagedHeaderRadius,
                        backgroundColor: TailwindColors.white,
                        borderWidth: 1,
                        borderColor: TailwindColors.gray400,
                    },
                ]}
                hoverStyles={[
                    {
                        backgroundColor: TailwindColors.gray400,
                        borderWidth: 1,
                        borderColor: TailwindColors.gray400,
                    },
                ]}
                textStyles={[styles.lg, styles.fontSemiBold, {color: TailwindColors.gray800}]}
                text={`See ${photos.length} photos`}
                onPress={onSeeAllPhotoPress}
            />
        </View>
    );

    return (
        <View
            style={[styles.flexColumn]}
            testID={RestaurantWithPhotosInfoPanel.displayName}
        >
            <View
                style={[
                    styles.w100,
                    {
                        height: variables.detailedHeaderPhotoCarouselItemHeight,
                    },
                ]}
            >
                <PhotoCarouselScrollView
                    key={`photosCarousel-${photos.length}`}
                    relatedId={restaurant.uniqueId}
                    photoType={PhotoType.Restaurant}
                    shouldShowMask
                    photos={photos}
                />
                <View
                    style={[
                        styles.pAbsolute,
                        {
                            left: 60,
                            right: 60,
                            bottom: 20,
                        },
                        {backgroundColor: 'transparent'},
                    ]}
                >
                    {renderInfo}
                </View>
                {photos.length > 0 && renderRightSeeAllPhotosButton}
            </View>
            <ActionBarInInfoPanel
                actionBarType={FBCollections.Restaurants}
                infoId={restaurant.uniqueId}
                onWriteReviewPress={() => {
                    navigationToEditReview({relatedId: restaurant.uniqueId, reviewType: ReviewType.Restaurant});
                }}
                onAddPhotoPress={() => {
                    Navigation.navigate(ROUTES.TAKE_PHOTO.getRoute({relatedId: restaurant.uniqueId, photoType: PhotoType.Restaurant}));
                }}
            />
        </View>
    );
}

RestaurantWithPhotosInfoPanel.displayName = 'RestaurantWithPhotosInfoPanel';

export default React.memo(RestaurantWithPhotosInfoPanel);
