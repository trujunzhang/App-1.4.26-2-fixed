/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {useQuery} from '@realm/react';
import type {ReactNode} from 'react';
import React from 'react';
import {View} from 'react-native';
import FullPageNotFoundView from '@components/BlockingViews/FullPageNotFoundView';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import {PressableWithoutFeedback} from '@components/Pressable';
import type {ScreenWrapperChildrenProps} from '@components/ScreenWrapper';
import ScreenWrapper from '@components/ScreenWrapper';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import * as DeviceCapabilities from '@libs/DeviceCapabilities';
import {RealmCollections} from '@libs/Realm/constant';
import {toRealmModelList} from '@libs/Realm/helpers/realmTypeHelper';
import * as RealmQuery from '@libs/Realm/services/realm-query';
import Navigation from '@navigation/Navigation';
import CONST from '@src/CONST';
import ROUTES from '@src/ROUTES';
import type {IFBPhoto, IFBSqlPhoto} from '@src/types/firebase';
import callOrReturn from '@src/types/utils/callOrReturn';

type TakePhotoScreenWrapperProps = {
    /** The title to show in the header (should be translated already) */
    headerTitle: string;

    /** A function triggered when the back button is pressed */
    onBackButtonPress: () => void;

    /** A function triggered when the entry transition is ended. Useful for auto-focusing elements. */
    onEntryTransitionEnd?: () => void;

    /** Whether or not the wrapper should be shown (sometimes screens can be embedded inside another screen that already is using a wrapper) */
    shouldShowWrapper: boolean;

    /** Whether or not to display not found page */
    shouldShowNotFoundPage?: boolean;

    /** An ID used for unit testing */
    testID: string;

    /** Whether or not to include safe area padding */
    includeSafeAreaPaddingBottom?: boolean;

    /** Returns a function as a child to pass insets to or a node to render without insets */
    children: ReactNode | React.FC<ScreenWrapperChildrenProps>;

    photoPageId: string;
};

function TakePhotoScreenWrapper({
    testID,
    headerTitle,
    onBackButtonPress,
    onEntryTransitionEnd,
    children,
    photoPageId,
    shouldShowWrapper,
    shouldShowNotFoundPage,
    includeSafeAreaPaddingBottom,
}: TakePhotoScreenWrapperProps) {
    const styles = useThemeStyles();
    const theme = useTheme();
    const {translate} = useLocalize();

    const sqlPhotos = useQuery<IFBSqlPhoto>(RealmCollections.SqlPhotos, RealmQuery.queryForRealmSqlPhotos(photoPageId));
    const sqlPhotosInPage: IFBPhoto[] = toRealmModelList<IFBPhoto>(sqlPhotos);

    if (!shouldShowWrapper) {
        return <FullPageNotFoundView shouldShow={shouldShowNotFoundPage}>{children as ReactNode}</FullPageNotFoundView>;
    }

    return (
        <ScreenWrapper
            includeSafeAreaPaddingBottom={includeSafeAreaPaddingBottom}
            onEntryTransitionEnd={onEntryTransitionEnd}
            testID={testID}
            shouldEnableMaxHeight={DeviceCapabilities.canUseTouchScreen()}
        >
            {({insets, safeAreaPaddingBottomStyle, didScreenTransitionEnd}) => (
                <FullPageNotFoundView shouldShow={shouldShowNotFoundPage}>
                    <View style={[styles.flex1]}>
                        <HeaderWithBackButton
                            title={headerTitle}
                            onBackButtonPress={onBackButtonPress}
                        >
                            {sqlPhotosInPage.length > 0 && (
                                <View>
                                    <PressableWithoutFeedback
                                        onPress={() => {
                                            Navigation.navigate(ROUTES.LOCAL_PHOTOS.getRoute(photoPageId));
                                        }}
                                        style={[]}
                                        role="button"
                                        accessibilityLabel={translate('common.back')}
                                        nativeID={CONST.BACK_BUTTON_NATIVE_ID}
                                    >
                                        <Text style={[styles.takePhotosOfflineText, styles.lg]}>{sqlPhotosInPage.length}</Text>
                                    </PressableWithoutFeedback>
                                </View>
                            )}
                        </HeaderWithBackButton>
                        {
                            // If props.children is a function, call it to provide the insets to the children
                            callOrReturn(children, {insets, safeAreaPaddingBottomStyle, didScreenTransitionEnd})
                        }
                    </View>
                </FullPageNotFoundView>
            )}
        </ScreenWrapper>
    );
}

export default TakePhotoScreenWrapper;
