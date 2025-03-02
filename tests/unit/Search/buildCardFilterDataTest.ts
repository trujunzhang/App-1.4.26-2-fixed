// The cards_ object keys don't follow normal naming convention, so to test this reliably we have to disable liner

/* eslint-disable @typescript-eslint/naming-convention */
import {buildCardFeedsData, buildIndividualCardsData} from '@expPages/Search/SearchAdvancedFiltersPage/SearchFiltersCardPage';
import type {LocaleContextProps} from '@components/LocaleContextProvider';
import type {CardList, WorkspaceCardsList} from '@src/types/onyx';

jest.mock('@libs/PolicyUtils', () => {
    return {
        getPolicy(policyID: string) {
            switch (policyID) {
                case '1':
                    return {name: ''};
                case '2':
                    return {name: 'test1'};
                case '3':
                    return {name: 'test2'};
                default:
                    return {name: ''};
            }
        },
    };
});

const workspaceCardFeeds = {
    cards_18680694_vcf: {
        '21593492': {
            accountID: 1,
            bank: 'vcf',
            cardID: 21593492,
            cardName: '480801XXXXXX9411',
            domainName: 'expensify-policy1.exfy',
            lastFourPAN: '9411',
        },
        '21604933': {
            accountID: 1,
            bank: 'vcf',
            cardID: 21604933,
            cardName: '480801XXXXXX1601',
            domainName: 'expensify-policy1.exfy',
            lastFourPAN: '1601',
        },
        '21638320': {
            accountID: 1,
            bank: 'vcf',
            cardID: 21638320,
            cardName: '480801XXXXXX2617',
            domainName: 'expensify-policy1.exfy',
            lastFourPAN: '2617',
        },
        '21638598': {
            accountID: 1,
            bank: 'vcf',
            cardID: 21638598,
            cardName: '480801XXXXXX2111',
            domainName: 'expensify-policy1.exfy',
            lastFourPAN: '2111',
        },
        cardList: {
            test: '231:1111111',
        },
    },
    'cards_18755165_Expensify Card': {
        '21588678': {
            accountID: 1,
            bank: 'Expensify Card',
            cardID: 21588678,
            cardName: '455594XXXXXX1138',
            domainName: 'expensify-policy2.exfy',
            lastFourPAN: '1138',
        },
        '21588684': {
            accountID: 1,
            bank: 'Expensify Card',
            cardID: 21588684,
            cardName: '',
            domainName: 'expensify-policy2.exfy',
            lastFourPAN: '',
        },
    },
    'cards_11111_Expensify Card': {
        '21589168': {
            accountID: 1,
            bank: 'Expensify Card',
            cardID: 21589168,
            cardName: '455594XXXXXX4163',
            domainName: 'expensify-policy3.exfy',
            lastFourPAN: '4163',
        },
        '21589182': {
            accountID: 1,
            bank: 'Expensify Card',
            cardID: 21589182,
            cardName: '',
            domainName: 'expensify-policy3.exfy',
            lastFourPAN: '',
        },
        '21589202': {
            accountID: 1,
            bank: 'Expensify Card',
            cardID: 21589202,
            cardName: '455594XXXXXX6232',
            domainName: 'expensify-policy3.exfy',
            lastFourPAN: '6232',
        },
        '21638322': {
            accountID: 1,
            bank: 'Expensify Card',
            cardID: 21638322,
            cardName: '',
            domainName: 'expensify-policy3.exfy',
            lastFourPAN: '',
        },
    },
};

const cardList = {
    '21588678': {
        accountID: 1,
        bank: 'Expensify Card',
        cardID: 21588678,
        cardName: '455594XXXXXX1138',
        domainName: 'expensify-policy2.exfy',
        lastFourPAN: '1138',
    },
    '21588684': {
        accountID: 1,
        bank: 'Expensify Card',
        cardID: 21588684,
        cardName: '',
        domainName: 'expensify-policy2.exfy',
        lastFourPAN: '',
    },
    '21589202': {
        accountID: 1,
        bank: 'Expensify Card',
        cardID: 21589202,
        cardName: '455594XXXXXX6232',
        domainName: 'expensify-policy3.exfy',
        lastFourPAN: '6232',
    },
    '21604933': {
        accountID: 1,
        bank: 'vcf',
        cardID: 21604933,
        cardName: '480801XXXXXX1601',
        domainName: 'expensify-policy1.exfy',
        lastFourPAN: '1601',
    },
    '11111111': {
        accountID: 1,
        bank: 'Expensify Card',
        cardID: 11111111,
        cardName: '455594XXXXXX1138',
        domainName: 'testDomain',
        lastFourPAN: '1138',
    },
};

const domainFeedDataMock = {testDomain: {domainName: 'testDomain', bank: 'Expensify Card', correspondingCardIDs: ['11111111']}};

const translateMock = jest.fn();

describe('buildIndividualCardsData', () => {
    const result = buildIndividualCardsData(workspaceCardFeeds as unknown as Record<string, WorkspaceCardsList | undefined>, cardList as unknown as CardList, {}, ['21588678']);

    it("Builds all individual cards and doesn't generate duplicates", () => {
        expect(result.unselected.length + result.selected.length).toEqual(11);

        // Check if Expensify card was built correctly
        const expensifyCard = result.selected.find((card) => card.keyForList === '21588678');
        expect(expensifyCard).toMatchObject({
            lastFourPAN: '1138',
            isSelected: true,
        });

        // Check if company card was built correctly
        const companyCard = result.unselected.find((card) => card.keyForList === '21604933');
        expect(companyCard).toMatchObject({
            lastFourPAN: '1601',
            isSelected: false,
        });
    });
});

describe('buildIndividualCardsData with empty argument objects', () => {
    it('Returns empty array when cardList and workspaceCardFeeds are empty', () => {
        const result = buildIndividualCardsData({}, {}, {}, []);
        expect(result).toEqual({selected: [], unselected: []});
    });
});

describe('buildCardFeedsData', () => {
    const result = buildCardFeedsData(
        workspaceCardFeeds as unknown as Record<string, WorkspaceCardsList | undefined>,
        domainFeedDataMock,
        [],
        translateMock as LocaleContextProps['translate'],
    );

    it('Buids domain card feed properly', () => {
        // Check if domain card feed was built properly
        expect(result.unselected.at(0)).toMatchObject({
            isCardFeed: true,
            correspondingCards: ['11111111'],
        });
        expect(translateMock).toHaveBeenCalledWith('search.filters.card.cardFeedName', {cardFeedBankName: undefined, cardFeedLabel: 'testDomain'});
        // Check if workspace card feed that comes from company cards was built properly.
        expect(result.unselected.at(1)).toMatchObject({
            isCardFeed: true,
            correspondingCards: ['21593492', '21604933', '21638320', '21638598'],
        });
        expect(translateMock).toHaveBeenCalledWith('search.filters.card.cardFeedName', {cardFeedBankName: 'Visa', cardFeedLabel: undefined});
        // Check if workspace card feed that comes from expensify cards was built properly
        expect(result.unselected.at(2)).toMatchObject({
            isCardFeed: true,
            correspondingCards: ['21588678', '21588684'],
        });
        expect(translateMock).toHaveBeenCalledWith('search.filters.card.cardFeedName', {cardFeedBankName: undefined, cardFeedLabel: 'test1'});

        // Check if workspace card feed that comes from expensify cards was built properly.
        expect(result.unselected.at(3)).toMatchObject({
            isCardFeed: true,
            correspondingCards: ['21589168', '21589182', '21589202', '21638322'],
        });
        expect(translateMock).toHaveBeenCalledWith('search.filters.card.cardFeedName', {cardFeedBankName: undefined, cardFeedLabel: 'test2'});
    });
});

describe('buildIndividualCardsData with empty argument objects', () => {
    it('Return empty array when domainCardFeeds and workspaceCardFeeds are empty', () => {
        const result = buildCardFeedsData({}, {}, [], translateMock as LocaleContextProps['translate']);
        expect(result).toEqual({selected: [], unselected: []});
    });
});
