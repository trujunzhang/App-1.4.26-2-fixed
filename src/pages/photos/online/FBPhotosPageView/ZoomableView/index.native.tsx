import React from 'react';
import {View} from 'react-native';
import PhotosPageView from '@components/Ieatta/components/PhotosPage';
import type {ZoomableViewProps} from '@components/Ieatta/components/PhotosPage/types';
import Text from '@components/Text';
import useThemeStyles from '@hooks/useThemeStyles';

function ZoomableView({imageUrls, defaultIndex, onPhotoIndexChanged, onClick}: ZoomableViewProps) {
    const styles = useThemeStyles();
    return (
        <PhotosPageView
            imageUrls={imageUrls}
            defaultIndex={defaultIndex}
            renderIndicator={(currentIndex?: number, allSize?: number) => (
                <View style={[styles.count]}>
                    <Text style={[styles.countText]}>{`${currentIndex}/${allSize}`}</Text>
                </View>
            )}
            onPhotoIndexChanged={onPhotoIndexChanged}
            onClick={onClick}
        />
    );
}

export default ZoomableView;
