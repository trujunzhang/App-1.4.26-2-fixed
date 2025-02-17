import React from 'react';
import {View} from 'react-native';
import OfflineIndicator from '@components/OfflineIndicator';
import Text from '@components/Text';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import useStyleUtils from '@hooks/useStyleUtils';
import useThemeStyles from '@hooks/useThemeStyles';
import SignInHeroImage from '@pages/signin/SignInHeroImage';
import variables from '@styles/variables';
import type {SignInPageLayoutProps} from './types';

type SignInPageContentProps = Pick<SignInPageLayoutProps, 'welcomeText' | 'welcomeHeader' | 'shouldShowWelcomeText' | 'shouldShowWelcomeHeader'> & {
    /** The children to show inside the layout */
    children?: React.ReactNode;
};

function SignInPageContent({shouldShowWelcomeHeader, welcomeHeader, welcomeText, shouldShowWelcomeText, children}: SignInPageContentProps) {
    const {isSmallScreenWidth} = useResponsiveLayout();
    const styles = useThemeStyles();
    const StyleUtils = useStyleUtils();

    return (
        <View>
            {isSmallScreenWidth ? (
                <View style={[styles.mb12]}>
                    <SignInHeroImage />
                </View>
            ) : null}
            <View style={[isSmallScreenWidth ? styles.alignItemsCenter : styles.alignItemsStart]}>
                <View>
                    <Text
                        style={[
                            styles.loginHeroHeader,
                            StyleUtils.getLineHeightStyle(variables.lineHeightSignInHeroXSmall),
                            StyleUtils.getFontSizeStyle(variables.fontSizeSignInHeroXSmall),
                            !welcomeText ? styles.mb5 : {},
                            !isSmallScreenWidth ? styles.textAlignLeft : {},
                            styles.mb2,
                        ]}
                    >
                        {welcomeHeader}
                    </Text>
                    <Text style={[styles.loginHeroBody, styles.mb2, styles.textNormal, !isSmallScreenWidth ? styles.textAlignLeft : {}]}>{welcomeText}</Text>
                </View>
                <View style={[styles.mt2, styles.alignItemsStart]}>
                    {children}
                    <OfflineIndicator style={[styles.m0, styles.p8, styles.alignItemsStart]} />
                </View>
            </View>
        </View>
    );
}

SignInPageContent.displayName = 'SignInPageContent';

export default SignInPageContent;
