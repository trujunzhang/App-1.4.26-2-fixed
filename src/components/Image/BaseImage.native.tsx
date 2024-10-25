/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable import/no-relative-packages */
import type {ImageLoadEventData} from 'expo-image';
import {useCallback, useRef} from 'react';
import Log from '@libs/Log';
import {Image as CachedImage} from '../../../plugins/react-native-expo-image-cache/src';
import type {BaseImageProps} from './types';

function BaseImage({onLoad, source, ...props}: BaseImageProps) {
    const isLoadedRef = useRef(false);
    const imageLoadedSuccessfully = useCallback(
        (event: ImageLoadEventData) => {
            if (!onLoad) {
                return;
            }
            if (isLoadedRef.current === true) {
                return;
            }

            // We override `onLoad`, so both web and native have the same signature
            const {width, height} = event.source;
            isLoadedRef.current = true;
            onLoad({nativeEvent: {width, height}});
        },
        [onLoad],
    );

    // Log.info('');
    // Log.info('================================');
    // Log.info(`BaseImage on the native side: ${JSON.stringify(source)}`);
    // Log.info(`BaseImage on the native side: ${(source as any).uri}`);
    // Log.info('================================');
    // Log.info('');

    // const cachedImageUri = (source as any).uri.replace('http://res.cloudinary.com', 'https://res.cloudinary.com');
    const cachedImageUri = (source as any).uri;

    return (
        <CachedImage
            uri={cachedImageUri}
            // Only subscribe to onLoad when a handler is provided to avoid unnecessary event registrations, optimizing performance.
            // onLoad={onLoad ? imageLoadedSuccessfully : undefined}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
        />
    );
}

BaseImage.displayName = 'BaseImage';

export default BaseImage;
