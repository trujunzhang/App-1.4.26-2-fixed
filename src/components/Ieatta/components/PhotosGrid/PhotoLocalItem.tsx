// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import React from 'react';
import {Image, View} from 'react-native';
import type {OnyxEntry} from 'react-native-onyx';
import {withOnyx} from 'react-native-onyx';
import Text from '@components/Text';
import useThemeStyles from '@hooks/useThemeStyles';
import type {IPhotoLocalItemRow} from '@libs/FirebaseIeatta/list/types/rows/photo';
import TailwindColors from '@styles/tailwindcss/colors';
import ONYXKEYS from '@src/ONYXKEYS';

type PhotoLocalItemOnyxProps = {
    firebaseCurrentSyncId: OnyxEntry<string>;
};
type PhotoLocalItemProps = PhotoLocalItemOnyxProps & {
    localItem: IPhotoLocalItemRow;
};

function PhotoLocalItem({localItem, firebaseCurrentSyncId}: PhotoLocalItemProps) {
    const styles = useThemeStyles();
    const {photo: item, photoWidth, photoHeight} = localItem;

    return (
        <View
            style={[
                _.isUndefined(photoWidth) ? styles.w100 : {width: photoWidth},
                {
                    height: photoHeight,
                },
            ]}
        >
            <Image
                source={{uri: `file://${item.offlinePath}`}}
                style={[styles.w100, styles.h100]}
            />
            {item.firebasePhotoId === firebaseCurrentSyncId && (
                <View style={[styles.pAbsolute, styles.l0, styles.t0]}>
                    <Text
                        style={[
                            {
                                color: TailwindColors.red500,
                                fontSize: 48,
                            },
                            styles.ml4,
                            styles.mt4,
                        ]}
                    >
                        Syncing
                    </Text>
                </View>
            )}
        </View>
    );
}

const PhotoLocalItemWithOnyx = withOnyx<PhotoLocalItemProps, PhotoLocalItemOnyxProps>({
    firebaseCurrentSyncId: {
        key: ONYXKEYS.FIREBASE_CURRENT_SYNC_ID,
    },
})(PhotoLocalItem);

export default React.memo(PhotoLocalItemWithOnyx);
