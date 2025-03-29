// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import React from 'react';
import {Image, View} from 'react-native';
import {useOnyx} from 'react-native-onyx';
import Text from '@components/Text';
import useThemeStyles from '@hooks/useThemeStyles';
import type {IPhotoLocalItemRow} from '@libs/FirebaseIeatta/list/types/rows/photo';
import TailwindColors from '@styles/tailwindcss/colors';
import ONYXKEYS from '@src/ONYXKEYS';

type PhotoLocalItemProps = {
    localItem: IPhotoLocalItemRow;
};

function PhotoLocalItem({localItem}: PhotoLocalItemProps) {
    const styles = useThemeStyles();
    const {photo: item, photoWidth, photoHeight} = localItem;

    const [firebaseCurrentSyncId] = useOnyx(ONYXKEYS.FIREBASE_CURRENT_SYNC_ID);

    return (
        <View
            style={[
                {
                    width: photoWidth,
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
                            },
                            styles.base,
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

PhotoLocalItem.displayName = 'PhotoLocalItem';

export default React.memo(PhotoLocalItem);
