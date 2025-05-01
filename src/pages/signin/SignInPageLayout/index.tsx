/* eslint-disable @typescript-eslint/no-unsafe-return */
import type {ForwardedRef} from 'react';
import React, {forwardRef, useMemo} from 'react';
import {View} from 'react-native';
import CommonFooter from '@components/Ieatta/components/CommonFooter';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import useStyleUtils from '@hooks/useStyleUtils';
import useThemeStyles from '@hooks/useThemeStyles';
import SignInPageHero from '@pages/signin/SignInPageHero';
import variables from '@styles/variables';
import SignInPageContent from './SignInPageContent';
import type {SignInPageLayoutProps, SignInPageLayoutRef} from './types';

function SignInPageLayout(
    {shouldShowWelcomeHeader = false, welcomeHeader, welcomeText = '', shouldShowWelcomeText = false, children}: SignInPageLayoutProps,
    _ref: ForwardedRef<SignInPageLayoutRef>,
) {
    const styles = useThemeStyles();
    const StyleUtils = useStyleUtils();
    // eslint-disable-next-line rulesdir/prefer-shouldUseNarrowLayout-instead-of-isSmallScreenWidth
    const {isSmallScreenWidth, isMediumScreenWidth, isLargeScreenWidth} = useResponsiveLayout();

    const signFormContainerStyle = useMemo(
        () => (isSmallScreenWidth ? [styles.flex1, styles.alignItemsCenter, styles.justifyContentCenter] : [styles.flex1, styles.alignItemsEnd, styles.justifyContentCenter, styles.pr25]),
        [isSmallScreenWidth, styles],
    );

    const signFormContent = (
        <View style={signFormContainerStyle}>
            <SignInPageContent
                welcomeHeader={welcomeHeader}
                welcomeText={welcomeText}
                shouldShowWelcomeText={shouldShowWelcomeText}
                shouldShowWelcomeHeader={shouldShowWelcomeHeader}
            >
                {children}
            </SignInPageContent>
        </View>
    );
    let pageLayoutView = null;

    if (isSmallScreenWidth) {
        pageLayoutView = (
            <View style={[styles.flex1]}>
                {/* Top Section */}
                <View style={[styles.flex1]}>
                    {/* Left container */}
                    {signFormContent}
                </View>
            </View>
        );
    } else {
        pageLayoutView = (
            <View style={[styles.flex1]}>
                {/* Top Section */}
                <View style={[styles.flex1, styles.flexRow]}>
                    {/* Left container */}
                    {signFormContent}
                    {/* Right container */}
                    <View style={[styles.flex1, styles.alignItemsCenter, styles.justifyContentCenter]}>
                        <View
                            style={[
                                styles.alignSelfStart,
                                StyleUtils.getMaximumWidth(variables.signInContentMaxWidth),
                                isMediumScreenWidth ? styles.ph10 : {},
                                isLargeScreenWidth ? styles.ph25 : {},
                            ]}
                        >
                            <SignInPageHero />
                        </View>
                    </View>
                </View>
                {/*  Bottom footer section */}
                <CommonFooter />
            </View>
        );
    }

    return <View style={[styles.flex1]}>{pageLayoutView}</View>;
}

SignInPageLayout.displayName = 'SignInPageLayout';

export default forwardRef(SignInPageLayout);
