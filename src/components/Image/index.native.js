import lodashGet from 'lodash/get';
import React from 'react';
import {withOnyx} from 'react-native-onyx';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
// eslint-disable-next-line rulesdir/prefer-import-module-contents
import {Image as CachedImage} from '../../../plugins/react-native-expo-image-cache/src';
import {defaultProps, imagePropTypes} from './imagePropTypes';
import RESIZE_MODES from './resizeModes';

function Image(props) {
    // eslint-disable-next-line react/destructuring-assignment
    const {source, isAuthTokenRequired, session, ...rest} = props;

    let imageSource = source;
    if (source && source.uri && typeof source.uri === 'number') {
        imageSource = source.uri;
    }
    if (typeof imageSource !== 'number' && isAuthTokenRequired) {
        const authToken = lodashGet(props, 'session.encryptedAuthToken', null);
        imageSource = {
            ...source,
            headers: authToken
                ? {
                      [CONST.CHAT_ATTACHMENT_TOKEN_KEY]: authToken,
                  }
                : null,
        };
    }

    return (
        <CachedImage
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
            uri={imageSource.uri}
            // source={{uri: "https://res.cloudinary.com/di3fvexj8/image/upload/v1507529261/politicl/o_xr3usf.jpg"}}
            onLoad={(evt) => {
                const {width, height} = evt.nativeEvent;
                if (props.onLoad) {
                    props.onLoad(evt);
                }
            }}
            // eslint-disable-next-line rulesdir/prefer-early-return
            onError={(evt) => {
                if (props.onError) {
                    props.onError();
                }
            }}
        />
    );
}

Image.propTypes = imagePropTypes;
Image.defaultProps = defaultProps;
Image.displayName = 'Image';
const ImageWithOnyx = withOnyx({
    session: {
        key: ONYXKEYS.SESSION,
    },
})(Image);
ImageWithOnyx.resizeMode = RESIZE_MODES;

export default ImageWithOnyx;
