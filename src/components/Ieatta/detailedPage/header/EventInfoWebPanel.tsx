/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable you-dont-need-lodash-underscore/is-undefined */
// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import lodashGet from 'lodash/get';
import moment from 'moment';
import React from 'react';
import {Image as RNImage, View} from 'react-native';
import type {OnyxEntry} from 'react-native-onyx';
import {withOnyx} from 'react-native-onyx';
import Button from '@components/Button';
import Icon from '@components/Icon';
import * as Ieattaicons from '@components/Icon/Ieattaicons';
import {IeattaStars} from '@components/Icon/IeattaStars';
import Divider from '@components/Ieatta/components/Divider';
import {SectionCommonTitle} from '@components/Ieatta/detailedPage/common';
import PageFlashListItemWithEvent from '@components/Ieatta/detailedPage/PageFlashListItemWithEvent';
import ImagePlaceholder from '@components/ImagePlaceholder';
import MapView from '@components/MapView';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import {FBCollections, ReviewType} from '@libs/FirebaseIeatta/constant';
import {PageSection, RowPressableType} from '@libs/FirebaseIeatta/list/constant';
import type {IDisplayNameTitleRow} from '@libs/FirebaseIeatta/list/types/rows/common';
import {calcRateForRestaurant} from '@libs/FirebaseIeatta/utils/rate_utils';
import {StringUtils} from '@libs/FirebaseIeatta/utils/string_utils';
import {navigationToEditEvent, navigationToEditReview} from '@libs/ieatta/editFormUtils';
import TailwindColors from '@styles/tailwindcss/colors';
import variables from '@styles/variables';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import type {IFBEvent, IFBRestaurant} from '@src/types/firebase';
import type {MapboxAccessToken} from '@src/types/onyx';
import ActionBarInInfoPanel from './ActionBarInInfoPanel';

type EventInfoWebPropsOnyxProps = {
    /** Data about Mapbox token for calling Mapbox API */
    mapboxAccessToken: OnyxEntry<MapboxAccessToken>;
};
type EventInfoWebPanelProps = EventInfoWebPropsOnyxProps & {
    /** The ID of the report that the option is for */
    event: IFBEvent;
    restaurant: IFBRestaurant | undefined;
};

function EventInfoWePanel({restaurant, event, mapboxAccessToken}: EventInfoWebPanelProps) {
    const theme = useTheme();
    const styles = useThemeStyles();
    const {translate} = useLocalize();
    const {isSmallScreenWidth} = useResponsiveLayout();
    const {windowWidth} = useWindowDimensions();
    const shouldShowRightMap = windowWidth > 600 + variables.sideBarWidth;

    const dateTable = () => {
        return (
            <View style={[styles.flexColumn, styles.mb1]}>
                <View style={[styles.flexRow, styles.alignItemsCenter]}>
                    <View style={[styles.mr1]}>
                        <Text style={[styles.base, styles.fontSemiBold]}>From:</Text>
                    </View>
                    <View>
                        <Text>{moment(event.start).format('YYYY-MM-DD hh:mm')}</Text>
                    </View>
                </View>
                <View style={[styles.flexRow, styles.alignItemsCenter]}>
                    <View style={[styles.mr1]}>
                        <Text style={[styles.base, styles.fontSemiBold]}>To:</Text>
                    </View>
                    <View>
                        <Text>{moment(event.end).format('YYYY-MM-DD hh:mm')}</Text>
                    </View>
                </View>
            </View>
        );
    };
    const infoRow = (
        <View style={[styles.flexColumn, styles.alignItemsStart, styles.gap2]}>
            <Text style={[styles.eventTitleInWebHeaderPanel]}>{event.displayName}</Text>
            <View style={[styles.flexRow, styles.alignItemsCenter, styles.gap2]}>
                <RNImage
                    style={[styles.ratingIconInHeaderPanel]}
                    source={IeattaStars.STARS.SMALL[calcRateForRestaurant(event.rate, event.reviewCount)]}
                />
                <Text style={[]}> {`${event.reviewCount} reviews`}</Text>
                <Button
                    medium
                    style={[{backgroundColor: TailwindColors.blue500}]}
                    innerStyles={[{backgroundColor: TailwindColors.blue500}]}
                    hoverStyles={[{backgroundColor: TailwindColors.blue700}]}
                    textStyles={[{color: TailwindColors.white}]}
                    text={translate('common.edit')}
                    onPress={() => {
                        navigationToEditEvent({eventId: event.uniqueId, restaurantId: event.restaurantId});
                    }}
                />
            </View>
        </View>
    );

    const restaurantInfo = () => {
        const rowData: IDisplayNameTitleRow = {
            relatedId: lodashGet(event, 'restaurantId', ''),
            modelPath: FBCollections.Restaurants,
            displayName: lodashGet(restaurant, 'displayName', ''),
        };
        return (
            <View style={[styles.flex1, styles.flexColumn, styles.alignItemsStart, styles.gap2]}>
                <PageFlashListItemWithEvent
                    pageRow={{
                        rowKey: 'PageSection.DISPLAY_NAME_TITLE_ROW<Restaurant-Title>',
                        rowType: PageSection.DISPLAY_NAME_TITLE_ROW,
                        rowData,
                        modalName: 'display-name',
                        pressType: RowPressableType.SINGLE_PRESS,
                    }}
                />
                <View style={[styles.flexRow, styles.alignItemsCenter, styles.gap2]}>
                    <RNImage
                        style={[styles.ratingIconInHeaderPanel]}
                        source={IeattaStars.STARS.SMALL[calcRateForRestaurant(lodashGet(restaurant, 'rate', 0), lodashGet(restaurant, 'reviewCount', 0))]}
                    />
                    <Text style={[]}> {`${lodashGet(restaurant, 'reviewCount', 0)} reviews`}</Text>
                </View>
                <Text
                    numberOfLines={2}
                    style={[styles.base, styles.fontNormal, styles.textSupporting]}
                >
                    {restaurant?.address}
                </Text>
            </View>
        );
    };

    const leftPanel = (
        <View style={[styles.flex1, styles.flexRow, styles.alignItemsStart, styles.eventLeftPanelBorderInWebHeaderPanel, styles.borderColorBorder]}>
            <View style={[styles.flex1, styles.h100]}>
                <ImagePlaceholder
                    key={restaurant ? restaurant?.uniqueId : event.uniqueId}
                    sourceUri={lodashGet(restaurant, 'originalUrl', '')}
                    style={[styles.w100, styles.h100]}
                    imageType="png"
                    placeholder={Ieattaicons.PNGBusinessMediumSquare}
                />
            </View>
            {/** Right Info Container  */}
            <View style={[styles.flex1, styles.flexColumn, styles.h100]}>
                {/** Up Info Container  */}
                <View style={[styles.flex1, styles.w100, styles.ph8, styles.pv8, styles.gap1]}>
                    <View style={[styles.flexRow, styles.gap2]}>
                        <Icon
                            src={Ieattaicons.MapMarker}
                            width={variables.iconSizeLarge}
                            height={variables.iconSizeLarge}
                            fill={theme.textSupporting}
                        />
                        {_.isUndefined(restaurant) === false && restaurantInfo()}
                    </View>
                </View>
                {/** Middle Divider Container  */}
                <View style={[styles.flexRow, styles.w100, styles.justifyContentCenter]}>
                    <Divider dividerStyle={[styles.w90]} />
                </View>
                {/** Down Info Container  */}
                <View style={[styles.flex1, styles.w100, styles.ph8, styles.pv8, styles.gap1]}>
                    <View style={[styles.flexRow, styles.gap3]}>
                        <Icon
                            src={Ieattaicons.EventInfo}
                            width={variables.iconSizeLarge}
                            height={variables.iconSizeLarge}
                            fill={theme.textSupporting}
                        />
                        {dateTable()}
                    </View>
                </View>
            </View>
        </View>
    );

    const rightPanel = (
        <View style={[styles.flex1, styles.flexRow, {backgroundColor: 'transparent'}]}>
            {restaurant !== null && restaurant !== undefined && (
                <MapView
                    // initialState={{
                    //     zoom: CONST.MAPBOX.DEFAULT_ZOOM,
                    //     location: {longitude: restaurant.longitude, latitude: restaurant.latitude},
                    // }}
                    accessToken={mapboxAccessToken?.token ?? ''}
                    style={[styles.flex1, styles.w100, styles.h100, {backgroundColor: 'transparent'}]}
                    styleURL={CONST.MAPBOX.STYLE_URL}
                />
            )}
        </View>
    );

    const wantRow = (
        <View>
            <SectionCommonTitle titleRow={{title: 'sections.titles.eventWhatWhy', isSmallScreenWidth, titleColor: TailwindColors.red500}} />
            <Text style={[styles.mv2, styles.mh4, styles.w70]}>{StringUtils.capitalizeFirstLetter(event.want)}</Text>
        </View>
    );

    return (
        <View>
            <View style={[styles.eventWebInfoPanel, styles.mh4, styles.gap4]}>
                {infoRow}
                <View style={[styles.flex1, styles.flexRow, styles.gap4]}>
                    <View style={[styles.flex1]}>{leftPanel}</View>
                    {/* {shouldShowRightMap && <View style={[{width: 500}]}>{rightPanel}</View>} */}
                </View>
            </View>
            <ActionBarInInfoPanel
                actionBarType={FBCollections.Events}
                infoId={event.uniqueId}
                shouldShowAddPhotoButton={false}
                onWriteReviewPress={() => {
                    navigationToEditReview({relatedId: event.uniqueId, reviewType: ReviewType.Event});
                }}
            />
            {event.want !== '' && wantRow}
        </View>
    );
}

EventInfoWePanel.displayName = 'EventInfoWebPanel';
export default withOnyx<EventInfoWebPanelProps, EventInfoWebPropsOnyxProps>({
    mapboxAccessToken: {
        key: ONYXKEYS.MAPBOX_ACCESS_TOKEN,
    },
})(EventInfoWePanel);

// export default React.memo(EventInfoWePanel);
