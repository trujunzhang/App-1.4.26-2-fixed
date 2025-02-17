import type {ValueOf} from 'react-native-gesture-handler/lib/typescript/typeUtils';
import type CONST from '@src/CONST';
import type * as OnyxTypes from '@src/types/onyx';

/** Types of search data */
type SearchDataTypes = ValueOf<typeof CONST.SEARCH.DATA_TYPES>;

type SortOrder = ValueOf<typeof CONST.SEARCH.SORT_ORDER>;
type SearchColumnType = ValueOf<typeof CONST.SEARCH.TABLE_COLUMNS>;
type ExpenseSearchStatus = ValueOf<typeof CONST.SEARCH.STATUS.EXPENSE>;
type InvoiceSearchStatus = ValueOf<typeof CONST.SEARCH.STATUS.INVOICE>;
type TripSearchStatus = ValueOf<typeof CONST.SEARCH.STATUS.TRIP>;
type ChatSearchStatus = ValueOf<typeof CONST.SEARCH.STATUS.CHAT>;
type SearchStatus = ExpenseSearchStatus | InvoiceSearchStatus | TripSearchStatus | ChatSearchStatus;

type ASTNode = {
    operator: ValueOf<typeof CONST.SEARCH.SYNTAX_OPERATORS>;
    left: ValueOf<typeof CONST.SEARCH.SYNTAX_FILTER_KEYS> | ASTNode;
    right: string | ASTNode | string[];
};

type QueryFilter = {
    operator: ValueOf<typeof CONST.SEARCH.SYNTAX_OPERATORS>;
    value: string | number;
};

type AdvancedFiltersKeys = ValueOf<typeof CONST.SEARCH.SYNTAX_FILTER_KEYS>;

type QueryFilters = {
    [K in AdvancedFiltersKeys]?: QueryFilter[];
};

type SearchQueryString = string;

type SearchQueryAST = {
    type: SearchDataTypes;
    status: SearchStatus;
    sortBy: SearchColumnType;
    sortOrder: SortOrder;
    filters: ASTNode;
    policyID?: string;
};

type SearchQueryJSON = {
    inputQuery: SearchQueryString;
    hash: number;
    flatFilters: QueryFilters;
} & SearchQueryAST;

function buildSearchQueryJSON(query: SearchQueryString) {
    try {
        const result = {} as SearchQueryJSON;
        // const result = searchParser.parse(query) as SearchQueryJSON;
        // const flatFilters = getFilters(result);

        // Add the full input and hash to the results
        result.inputQuery = query;
        // result.flatFilters = flatFilters;
        // result.hash = getQueryHash(result);
        return result;
    } catch (e) {
        console.error(`Error when parsing SearchQuery: "${query}"`, e);
    }
}

function getSearchHeaderTitle(queryJSON: SearchQueryJSON, PersonalDetails: OnyxTypes.PersonalDetailsList) {
    const {type, status} = queryJSON;
    const filters = queryJSON.flatFilters ?? {};

    const title = `type:${type} status:${status}`;

    return title;
}

function getContextualSuggestionQuery(reportID: string) {
    return `type:chat in:${reportID}`;
}

export {buildSearchQueryJSON, getSearchHeaderTitle, getContextualSuggestionQuery};

export type {
    SearchQueryJSON,
    SearchQueryString,
    ASTNode,
    QueryFilter,
    QueryFilters,
    AdvancedFiltersKeys,
    SearchDataTypes,
    SearchStatus,
    SearchColumnType,
    SortOrder,
    ExpenseSearchStatus,
    InvoiceSearchStatus,
    TripSearchStatus,
    ChatSearchStatus,
};
