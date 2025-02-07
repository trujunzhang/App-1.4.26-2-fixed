import type * as NativeNavigation from '@react-navigation/native';
import type {StackScreenProps} from '@react-navigation/stack';
import {fireEvent, screen} from '@testing-library/react-native';
import React, {useMemo} from 'react';
import type {ComponentType} from 'react';
import Onyx from 'react-native-onyx';
import type {OnyxCollection, OnyxEntry} from 'react-native-onyx';
import {measurePerformance} from 'reassure';
import {LocaleContextProvider} from '@components/LocaleContextProvider';
import OptionListContextProvider, {OptionsListContext} from '@components/OptionListContextProvider';
import {KeyboardStateProvider} from '@components/withKeyboardState';
import type {WithNavigationFocusProps} from '@components/withNavigationFocus';
import type {RootStackParamList} from '@libs/Navigation/types';
import {createOptionList} from '@libs/OptionsListUtils';
import ComposeProviders from '@src/components/ComposeProviders';
import OnyxProvider from '@src/components/OnyxProvider';
import CONST from '@src/CONST';
import ChatFinderPage from '@src/expPages/ChatFinderPage';
import ONYXKEYS from '@src/ONYXKEYS';
import type SCREENS from '@src/SCREENS';
import type {Beta, PersonalDetails, Report} from '@src/types/onyx';
import createCollection from '../utils/collections/createCollection';
import createPersonalDetails from '../utils/collections/personalDetails';
import createRandomReport from '../utils/collections/reports';
import * as TestHelper from '../utils/TestHelper';
import waitForBatchedUpdates from '../utils/waitForBatchedUpdates';
import wrapOnyxWithWaitForBatchedUpdates from '../utils/wrapOnyxWithWaitForBatchedUpdates';

jest.mock('lodash/debounce', () =>
    jest.fn((fn: Record<string, jest.Mock<jest.Func>>) => {
        // eslint-disable-next-line no-param-reassign
        fn.cancel = jest.fn();
        return fn;
    }),
);

jest.mock('@src/libs/Log');

jest.mock('@src/libs/API', () => ({
    write: jest.fn(),
    makeRequestWithSideEffects: jest.fn(),
    read: jest.fn(),
}));

jest.mock('@src/libs/Navigation/Navigation');

jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
        ...actualNav,
        useFocusEffect: jest.fn(),
        useIsFocused: () => true,
        useRoute: () => jest.fn(),
        useNavigation: () => ({
            navigate: jest.fn(),
            addListener: () => jest.fn(),
        }),
        createNavigationContainerRef: jest.fn(),
    } as typeof NativeNavigation;
});

jest.mock('@src/components/withNavigationFocus', () => (Component: ComponentType<WithNavigationFocusProps>) => {
    function WithNavigationFocus(props: WithNavigationFocusProps) {
        return (
            <Component
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...props}
                isFocused={false}
            />
        );
    }

    WithNavigationFocus.displayName = 'WithNavigationFocus';

    return WithNavigationFocus;
});
// mock of useDismissedReferralBanners
jest.mock('../../src/hooks/useDismissedReferralBanners', () => ({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    default: jest.fn(() => ({
        isDismissed: false,
        setAsDismissed: () => {},
    })),
}));

const getMockedReports = (length = 100) =>
    createCollection<Report>(
        (item) => `${ONYXKEYS.COLLECTION.REPORT}${item.reportID}`,
        (index) => createRandomReport(index),
        length,
    );

const getMockedPersonalDetails = (length = 100) =>
    createCollection<PersonalDetails>(
        (item) => item.accountID,
        (index) => createPersonalDetails(index),
        length,
    );

const mockedReports = getMockedReports(600);
const mockedBetas = Object.values(CONST.BETAS);
const mockedPersonalDetails = getMockedPersonalDetails(100);
const mockedOptions = createOptionList(mockedPersonalDetails, mockedReports);

beforeAll(() =>
    Onyx.init({
        keys: ONYXKEYS,
        safeEvictionKeys: [ONYXKEYS.COLLECTION.REPORT],
    }),
);

// Initialize the network key for OfflineWithFeedback
beforeEach(() => {
    // @ts-expect-error TODO: Remove this once TestHelper (https://github.com/Ieatta/App/issues/25318) is migrated to TypeScript.
    global.fetch = TestHelper.getGlobalFetchMock();
    wrapOnyxWithWaitForBatchedUpdates(Onyx);
    Onyx.merge(ONYXKEYS.NETWORK, {isOffline: false});
});

// Clear out Onyx after each test so that each test starts with a clean state
afterEach(() => {
    Onyx.clear();
});

type ChatFinderPageProps = StackScreenProps<RootStackParamList, typeof SCREENS.CHAT_FINDER_ROOT> & {
    betas: OnyxEntry<Beta[]>;
    reports: OnyxCollection<Report>;
    isSearchingForReports: OnyxEntry<boolean>;
};

function ChatFinderPageWrapper(args: ChatFinderPageProps) {
    return (
        <ComposeProviders components={[OnyxProvider, LocaleContextProvider, KeyboardStateProvider]}>
            <OptionListContextProvider>
                <ChatFinderPage
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...args}
                    navigation={args.navigation}
                />
            </OptionListContextProvider>
        </ComposeProviders>
    );
}

function ChatFinderPageWithCachedOptions(args: ChatFinderPageProps) {
    return (
        <ComposeProviders components={[OnyxProvider, LocaleContextProvider]}>
            <OptionsListContext.Provider value={useMemo(() => ({options: mockedOptions, initializeOptions: () => {}, areOptionsInitialized: true}), [])}>
                <ChatFinderPage
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...args}
                    navigation={args.navigation}
                />
            </OptionsListContext.Provider>
        </ComposeProviders>
    );
}

test('[ChatFinderPage] should render list with cached options', async () => {
    const {addListener} = TestHelper.createAddListenerMock();

    const scenario = async () => {
        await screen.findByTestId('ChatFinderPage');
    };

    const navigation = {addListener};

    return (
        waitForBatchedUpdates()
            .then(() =>
                Onyx.multiSet({
                    ...mockedReports,
                    [ONYXKEYS.PERSONAL_DETAILS_LIST]: mockedPersonalDetails,
                    [ONYXKEYS.BETAS]: mockedBetas,
                    [ONYXKEYS.IS_SEARCHING_FOR_REPORTS]: true,
                }),
            )
            // @ts-expect-error TODO: Remove this once TestHelper (https://github.com/Ieatta/App/issues/25318) is migrated to TypeScript.
            .then(() => measurePerformance(<ChatFinderPageWithCachedOptions navigation={navigation} />, {scenario}))
    );
});

test('[ChatFinderPage] should interact when text input changes', async () => {
    const {addListener} = TestHelper.createAddListenerMock();

    const scenario = async () => {
        await screen.findByTestId('ChatFinderPage');

        const input = screen.getByTestId('selection-list-text-input');
        fireEvent.changeText(input, 'Email Four');
        fireEvent.changeText(input, 'Report');
        fireEvent.changeText(input, 'Email Five');
    };

    const navigation = {addListener};

    return (
        waitForBatchedUpdates()
            .then(() =>
                Onyx.multiSet({
                    ...mockedReports,
                    [ONYXKEYS.PERSONAL_DETAILS_LIST]: mockedPersonalDetails,
                    [ONYXKEYS.BETAS]: mockedBetas,
                    [ONYXKEYS.IS_SEARCHING_FOR_REPORTS]: true,
                }),
            )
            // @ts-expect-error TODO: Remove this once TestHelper (https://github.com/Ieatta/App/issues/25318) is migrated to TypeScript.
            .then(() => measurePerformance(<ChatFinderPageWrapper navigation={navigation} />, {scenario}))
    );
});
