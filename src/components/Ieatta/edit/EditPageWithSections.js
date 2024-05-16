import lodashGet from 'lodash/get';
import PropTypes from 'prop-types';
import React, {useEffect, useRef} from 'react';
import {Image as RNImage, View} from 'react-native';
import {withOnyx} from 'react-native-onyx';
import _ from 'underscore';
import FullPageNotFoundView from '@components/BlockingViews/FullPageNotFoundView';
import FullScreenLoadingIndicator from '@components/FullscreenLoadingIndicator';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import {PressableWithFeedback} from '@components/Pressable';
import ScreenWrapper from '@components/ScreenWrapper';
import ScrollViewWithContext from '@components/ScrollViewWithContext';
import Tooltip from '@components/Tooltip';
import useLocalize from '@hooks/useLocalize';
import useNetwork from '@hooks/useNetwork';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import {clearDraftValuesByDraftId, setIsLoading} from '@libs/actions/FormActions';
import compose from '@libs/compose';
import BankAccount from '@libs/models/BankAccount';
import Navigation from '@libs/Navigation/Navigation';
import * as PolicyUtils from '@libs/PolicyUtils';
import * as ReimbursementAccountProps from '@expPages/ReimbursementAccount/reimbursementAccountPropTypes';
import userPropTypes from '@expPages/settings/userPropTypes';
import * as BankAccounts from '@userActions/BankAccounts';
import ONYXKEYS from '@src/ONYXKEYS';
import ROUTES from '@src/ROUTES';

const propTypes = {
    shouldSkipVBBACall: PropTypes.bool,

    /** The text to display in the header */
    headerText: PropTypes.string.isRequired,

    /** The route object passed to this page from the navigator */
    // route: PropTypes.shape({
    //     /** Each parameter passed via the URL */
    //     params: PropTypes.shape({
    //         /** The policyID that is being configured */
    //         policyID: PropTypes.string.isRequired,
    //     }).isRequired,
    // }).isRequired,

    /** User Data from Onyx */
    user: userPropTypes,

    /** Main content of the page */
    children: PropTypes.func,

    /** Content to be added as fixed footer */
    footer: PropTypes.element,

    /** The guides call task ID to associate with the workspace page being shown */
    guidesCallTaskID: PropTypes.string,

    /** The route where we navigate when the user press the back button */
    backButtonRoute: PropTypes.string,

    /** Policy values needed in the component */
    // policy: PropTypes.shape({
    //     name: PropTypes.string,
    // }).isRequired,

    /** Option to use the default scroll view  */
    shouldUseScrollView: PropTypes.bool,

    /** Option to show the loading page while the API is calling */
    shouldShowLoading: PropTypes.bool,

    /** A unique Onyx key identifying the form */
    formID: PropTypes.string.isRequired,

    editFormDraftID: PropTypes.string.isRequired,
};

const defaultProps = {
    children: () => {},
    user: {},
    footer: null,
    guidesCallTaskID: '',
    shouldUseScrollView: false,
    shouldSkipVBBACall: false,
    backButtonRoute: '',
    shouldShowLoading: true,
};

function fetchData(skipVBBACal) {
    if (skipVBBACal) {
        return;
    }

    BankAccounts.openWorkspaceView();
}

function EditPageWithSections({
    backButtonRoute,
    children,
    footer,
    guidesCallTaskID,
    headerText,
    // route,
    shouldUseScrollView,
    shouldSkipVBBACall,
    user,
    shouldShowLoading,
    formID,
    editFormDraftID,
}) {
    const styles = useThemeStyles();
    const theme = useTheme();
    const {translate} = useLocalize();

    // const isLoading = lodashGet(reimbursementAccount, 'isLoading', true);
    const isLoading = true;
    // const achState = lodashGet(reimbursementAccount, 'achData.state', '');
    // const hasVBA = achState === BankAccount.STATE.OPEN;
    const isUsingECard = lodashGet(user, 'isUsingExpensifyCard', false);
    // const policyID = lodashGet(route, 'params.policyID');
    const policyID = '';
    // const policyName = lodashGet(policy, 'name');
    const policyName = '';
    // const content = children(hasVBA, policyID, isUsingECard);
    const content = children(false, policyID, isUsingECard);
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
                    clearDraftValuesByDraftId(editFormDraftID);
                }}
                style={[styles.touchableButtonImage]}
                role="button"
                accessibilityLabel={translate('edit.reset')}
            >
                <RNImage
                    source={Expensicons.ResetIcon}
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
                <HeaderWithBackButton
                    title={headerText}
                    subtitle={policyName}
                    guidesCallTaskID={guidesCallTaskID}
                >
                    {rightResetButton}
                </HeaderWithBackButton>
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

EditPageWithSections.propTypes = propTypes;
EditPageWithSections.defaultProps = defaultProps;
EditPageWithSections.displayName = 'EditPageWithSections';

export default compose(
    withOnyx({
        user: {
            key: ONYXKEYS.USER,
        },
    }),
)(EditPageWithSections);
