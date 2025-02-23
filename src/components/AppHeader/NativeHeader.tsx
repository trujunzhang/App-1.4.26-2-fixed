import React, {useCallback} from 'react';
import {View} from 'react-native';
import Header from '@components/Header';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import IconMenuSvg from '@components/Icon/IconMenuSvg';
import * as Ieattaicons from '@components/Icon/Ieattaicons';
import {PressableWithoutFeedback} from '@components/Pressable';
import Tooltip from '@components/Tooltip';
import useLocalize from '@hooks/useLocalize';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import Navigation from '@navigation/Navigation';
import SignInOrAvatarWithOptionalStatus from '@pages/home/sidebar/SignInOrAvatarWithOptionalStatus';
import SearchRestaurantsButton from '@pages/searchPages/restaurants/SearchRouter/SearchRestaurantsButton';
import variables from '@styles/variables';
import CONST from '@src/CONST';
import type {TranslationPaths} from '@src/languages/types';
import ROUTES from '@src/ROUTES';

type NativeHeaderProps = {
    shouldShowBackButton?: boolean;
    shouldShowSearchIcon?: boolean;
    shouldShowAvatar?: boolean;
    title?: TranslationPaths;
    subtitle?: TranslationPaths;
    shouldShowSubtitle?: boolean;
    shouldShowAddIcon?: boolean;
    onAddIconPress?: () => void;
    shouldShowLocalPhotosIcon?: boolean;
};

function NativeHeader({
    shouldShowBackButton = false,
    shouldShowSearchIcon = true,
    shouldShowAvatar = true,
    title = 'sidebar.header.title',
    subtitle = 'sidebar.header.subTitle',
    shouldShowSubtitle = true,
    shouldShowAddIcon = false,
    onAddIconPress = () => {},
    shouldShowLocalPhotosIcon = false,
}: NativeHeaderProps) {
    const theme = useTheme();
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const isCreateMenuOpen = false;

    const showSearchPage = useCallback(() => {
        Navigation.openSideBarDrawer();
    }, []);

    const showLocalPhotoPage = useCallback(() => {
        Navigation.navigate(ROUTES.LOCAL_PHOTOS.getRoute(CONST.IEATTA_LOCAL_PHOTOS_SHOW_ALL));
    }, []);

    const showSideBar = useCallback(() => {
        Navigation.openSideBarDrawer();
    }, []);

    return (
        <View
            style={[styles.flexRow, styles.pr5, shouldShowBackButton ? styles.pl2 : styles.pl5, styles.pv3, styles.justifyContentBetween, styles.alignItemsCenter]}
            dataSet={{dragArea: true}}
        >
            {shouldShowBackButton ? (
                <Tooltip text={translate('common.back')}>
                    <PressableWithoutFeedback
                        onPress={() => {
                            Navigation.goBack();
                        }}
                        style={[styles.touchableButtonImage]}
                        role="button"
                        accessibilityLabel={translate('common.back')}
                        nativeID={CONST.BACK_BUTTON_NATIVE_ID}
                    >
                        <Icon
                            src={Expensicons.BackArrow}
                            fill={theme.icon}
                        />
                    </PressableWithoutFeedback>
                </Tooltip>
            ) : (
                <Tooltip text={translate('headerPanel.menu.button')}>
                    <PressableWithoutFeedback
                        accessibilityLabel={translate('headerPanel.menu.button')}
                        role={CONST.ROLE.BUTTON}
                        style={[styles.flexRow]}
                        onPress={showSideBar}
                    >
                        <IconMenuSvg
                            fill={theme.icon}
                            width={variables.iconMenuSizeWidth}
                            height={variables.iconMenuSizeHeight}
                        />
                    </PressableWithoutFeedback>
                </Tooltip>
            )}
            <Header
                title={translate(title)}
                subtitle={shouldShowSubtitle && translate(subtitle)}
                textStyles={[styles.textAlignCenter]}
                shouldShowEnvironmentBadge={false}
            />
            {shouldShowSearchIcon && <SearchRestaurantsButton />}
            {shouldShowLocalPhotosIcon && (
                <Tooltip text={translate('headerPanel.photo.local')}>
                    <PressableWithoutFeedback
                        accessibilityLabel={translate('headerPanel.photo.local')}
                        role={CONST.ROLE.BUTTON}
                        style={[styles.flexRow, styles.pr4]}
                        onPress={showLocalPhotoPage}
                    >
                        <Icon
                            fill={theme.icon}
                            src={Ieattaicons.PhotoLibrary}
                        />
                    </PressableWithoutFeedback>
                </Tooltip>
            )}
            {shouldShowAddIcon && (
                <Tooltip text={translate('headerPanel.add.button')}>
                    <PressableWithoutFeedback
                        accessibilityLabel={translate('headerPanel.add.button')}
                        role={CONST.ROLE.BUTTON}
                        style={[styles.flexRow, styles.pr4]}
                        onPress={onAddIconPress}
                    >
                        <Icon
                            fill={theme.icon}
                            src={Expensicons.Plus}
                        />
                    </PressableWithoutFeedback>
                </Tooltip>
            )}
            {shouldShowAvatar && <SignInOrAvatarWithOptionalStatus isCreateMenuOpen={isCreateMenuOpen} />}
        </View>
    );
}

NativeHeader.displayName = 'NativeHeader';

export default NativeHeader;
