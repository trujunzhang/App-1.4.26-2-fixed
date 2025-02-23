/* eslint-disable @typescript-eslint/consistent-type-imports */
import type {MutableRefObject} from 'react';
import React from 'react';
import {GestureResponderEvent, View} from 'react-native';
import type {OnyxEntry} from 'react-native-onyx';
import * as Expensicons from '@components/Icon/Expensicons';
import type {IPageRow} from '@libs/FirebaseIeatta/list/types/page-row';
import {actionEditNavigateTo} from '@libs/ieatta/EditNavigationUtils';
import type {TranslationPaths} from '@src/languages/types';
import type {Transaction} from '@src/types/onyx';
import type IconAsset from '@src/types/utils/IconAsset';
import type {ContextMenuAnchor} from './DetailedPageActionContextMenu';
import * as DetailedPageActionContextMenu from './DetailedPageActionContextMenu';

type ShouldShow = (selection: IPageRow, menuTarget: MutableRefObject<ContextMenuAnchor> | undefined) => boolean;

type ContextMenuActionPayload = {
    transaction?: OnyxEntry<Transaction>;
    selection: IPageRow;
    close: () => void;
    openContextMenu: () => void;
    interceptAnonymousUser: (callback: () => void, isAnonymousAction?: boolean) => void;
    anchor?: MutableRefObject<HTMLDivElement | View | Text | null>;
    checkIfContextMenuActive?: () => void;
    openOverflowMenu: (event: GestureResponderEvent | MouseEvent, anchorRef: MutableRefObject<View | null>) => void;
    event?: GestureResponderEvent | MouseEvent | KeyboardEvent;
    setIsEmojiPickerActive?: (state: boolean) => void;
    anchorRef?: MutableRefObject<View | null>;
};

type OnPress = (closePopover: boolean, payload: ContextMenuActionPayload) => void;

type RenderContent = (closePopover: boolean, payload: ContextMenuActionPayload) => React.ReactElement;

type GetDescription = (selection?: string) => string | void;

type ContextMenuActionWithContent = {
    renderContent: RenderContent;
};

type ContextMenuActionWithIcon = {
    textTranslateKey: TranslationPaths;
    icon: IconAsset;
    successTextTranslateKey?: TranslationPaths;
    successIcon?: IconAsset;
    onPress: OnPress;
    getDescription: GetDescription;
};

type ContextMenuAction = (ContextMenuActionWithContent | ContextMenuActionWithIcon) & {
    isAnonymousAction: boolean;
    shouldShow: ShouldShow;
    shouldPreventDefaultFocusOnPress?: boolean;
};

// A list of all the context actions in this menu.
const ContextMenuActions: ContextMenuAction[] = [
    {
        isAnonymousAction: true,
        textTranslateKey: 'detailedPageActionContextMenu.editAction',
        icon: Expensicons.Pencil,
        shouldShow: (selection: IPageRow, menuTarget: MutableRefObject<ContextMenuAnchor> | undefined) => {
            return true;
        },
        onPress: (_closePopover, {openContextMenu, selection}) => {
            const onHideCallback = () => {
                actionEditNavigateTo(selection);
            };
            DetailedPageActionContextMenu.hideContextMenu(false, onHideCallback);
        },
        getDescription: () => {
            return '';
        },
        shouldPreventDefaultFocusOnPress: false,
    },
    {
        isAnonymousAction: true,
        textTranslateKey: 'detailedPageActionContextMenu.deleteAction',
        icon: Expensicons.Trashcan,
        shouldShow: (selection: IPageRow, menuTarget: MutableRefObject<ContextMenuAnchor> | undefined) => {
            return true;
        },
        onPress: (_closePopover, {openContextMenu, selection}) => {
            DetailedPageActionContextMenu.hideContextMenu(false, () => {
                DetailedPageActionContextMenu.showDeleteModal(
                    selection,
                    true,
                    () => {},
                    () => openContextMenu(),
                );
            });
        },
        getDescription: () => {
            return '';
        },
        shouldPreventDefaultFocusOnPress: false,
    },
];

const restrictedReadOnlyActions: TranslationPaths[] = [
    'common.download',
    'reportActionContextMenu.replyInThread',
    'reportActionContextMenu.editAction',
    'reportActionContextMenu.joinThread',
    'reportActionContextMenu.deleteAction',
];

const RestrictedReadOnlyContextMenuActions: ContextMenuAction[] = ContextMenuActions.filter(
    (action) => 'textTranslateKey' in action && restrictedReadOnlyActions.includes(action.textTranslateKey),
);

export {RestrictedReadOnlyContextMenuActions};
export default ContextMenuActions;
export type {ContextMenuActionPayload, ContextMenuAction};
