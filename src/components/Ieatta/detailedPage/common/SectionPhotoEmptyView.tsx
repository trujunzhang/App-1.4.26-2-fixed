import React from 'react';
import {View} from 'react-native';
import Icon from '@components/Icon';
import * as Ieattaicons from '@components/Icon/Ieattaicons';
import {PressableWithFeedback} from '@components/Pressable';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import type {PhotoType} from '@libs/FirebaseIeatta/constant';
import Navigation from '@libs/Navigation/Navigation';
import TailwindColors from '@styles/tailwindcss/colors';
import variables from '@styles/variables';
import CONST from '@src/CONST';
import ROUTES from '@src/ROUTES';

type SectionPhotoEmptyViewProps = {
    /** The ID of the related object. */
    relatedId: string;
    /** The photo type of the related object. */
    photoType: PhotoType | string;
};

function SectionPhotoEmptyView({relatedId, photoType}: SectionPhotoEmptyViewProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    return (
        <View style={[styles.flexRow, styles.w100, styles.h100, styles.mh4, {backgroundColor: TailwindColors.gray200}]}>
            <PressableWithFeedback
                role={CONST.ROLE.BUTTON}
                accessibilityLabel={translate('photos.takePhoto.title')}
                style={[styles.alignItemsStart]}
                onPress={() => {
                    Navigation.navigate(ROUTES.TAKE_PHOTO.getRoute({relatedId, photoType}));
                }}
            >
                <View
                    style={[
                        {
                            width: variables.photoInRestaurantMobileItemWidth,
                            backgroundColor: TailwindColors.gray600,
                        },
                        styles.h100,
                        styles.justifyContentCenter,
                        styles.alignItemsCenter,
                    ]}
                >
                    <Icon
                        fill={TailwindColors.gray400}
                        width={variables.iconSizeSuperLarge}
                        height={variables.iconSizeSuperLarge}
                        src={Ieattaicons.EmptyCamera}
                    />
                </View>
            </PressableWithFeedback>
        </View>
    );
}

export default React.memo(SectionPhotoEmptyView);
