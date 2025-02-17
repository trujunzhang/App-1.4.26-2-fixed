/* eslint-disable react/no-unused-prop-types */
// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import type {ReactNode} from 'react';
import React, {useEffect, useRef} from 'react';
import {Image as RNImage, View} from 'react-native';
import FullPageNotFoundView from '@components/BlockingViews/FullPageNotFoundView';
import FullScreenLoadingIndicator from '@components/FullscreenLoadingIndicator';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import * as Ieattaicons from '@components/Icon/Ieattaicons';
import {PressableWithFeedback} from '@components/Pressable';
import ScreenWrapper from '@components/ScreenWrapper';
import ScrollViewWithContext from '@components/ScrollViewWithContext';
import Tooltip from '@components/Tooltip';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import {setIsLoading} from '@libs/actions/FormActions';
import {clearDraftValuesByDraftId} from '@libs/ieatta/editFormUtils';
import Navigation from '@libs/Navigation/Navigation';
import type {OnyxFormKey} from '@src/ONYXKEYS';
import type {Route} from '@src/ROUTES';

type EditPageWithSectionsProps = {
    /** The text to display in the header */
    headerText: string;

    /** Main content of the page */
    children: (() => ReactNode) | ReactNode;

    /** Content to be added as fixed footer */
    footer?: ReactNode;

    /** The route where we navigate when the user press the back button */
    backButtonRoute?: Route;

    /** Option to use the default scroll view  */
    shouldUseScrollView?: boolean;

    /** Option to show the loading page while the API is calling */
    shouldShowLoading?: boolean;

    /** Should show the back button. It is used when in RHP. */
    shouldShowBackButton?: boolean;

    /** Whether the offline indicator should be shown in wide screen devices */
    shouldShowOfflineIndicatorInWideScreen?: boolean;

    /** Whether to show this page to non admin policy members */
    shouldShowNonAdmin?: boolean;

    /** Whether to show the not found page */
    shouldShowNotFoundPage?: boolean;

    /** Whether the page is loading, example any other API call in progress */
    isLoading?: boolean;

    formID: OnyxFormKey;
    editFormDraftID: string;
};

function EditPageWithSections({children = () => null, footer = null, headerText, shouldUseScrollView = false, shouldShowLoading = true, formID}: EditPageWithSectionsProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const isLoading = true;
    // const content = children(hasVBA, policyID, isUsingECard);
    const content = typeof children === 'function' ? children() : children;
    const firstRender = useRef(true);

    const policy = undefined;

    // eslint-disable-next-line rulesdir/no-negated-variables
    const shouldShowNotFoundView = false;

    useEffect(() => {
        // Because isLoading is false before merging in Onyx, we need firstRender ref to display loading page as well before isLoading is change to true
        firstRender.current = false;
        setIsLoading(formID, false);
    }, [formID]);

    const rightResetButton = (
        <Tooltip text={translate('edit.reset')}>
            <PressableWithFeedback
                onPress={() => {
                    // clearDraftValuesByDraftId(editFormDraftID);
                }}
                style={[styles.touchableButtonImage]}
                role="button"
                accessibilityLabel={translate('edit.reset')}
            >
                <RNImage
                    source={Ieattaicons.ResetIcon}
                    style={[{width: 24, height: 24}]}
                />
            </PressableWithFeedback>
        </Tooltip>
    );

    return (
        <ScreenWrapper
            includeSafeAreaPaddingBottom={false}
            shouldEnablePickerAvoiding={false}
            shouldEnableMaxHeight
            testID={EditPageWithSections.displayName}
        >
            <FullPageNotFoundView
                onBackButtonPress={() => Navigation.goBack()}
                shouldShow={shouldShowNotFoundView}
                subtitleKey={_.isEmpty(policy) ? undefined : 'workspace.common.notAuthorized'}
            >
                <HeaderWithBackButton title={headerText}>{rightResetButton}</HeaderWithBackButton>
                {(isLoading || firstRender.current) && shouldShowLoading ? (
                    <FullScreenLoadingIndicator style={[styles.flex1, styles.pRelative]} />
                ) : (
                    <>
                        {shouldUseScrollView ? (
                            <ScrollViewWithContext
                                keyboardShouldPersistTaps="handled"
                                style={[styles.settingsPageBackground, styles.flex1, styles.w100]}
                            >
                                <View style={[styles.w100, styles.flex1]}>{content}</View>
                            </ScrollViewWithContext>
                        ) : (
                            content
                        )}
                        {footer}
                    </>
                )}
            </FullPageNotFoundView>
        </ScreenWrapper>
    );
}

EditPageWithSections.displayName = 'EditPageWithSections';

export default EditPageWithSections;
