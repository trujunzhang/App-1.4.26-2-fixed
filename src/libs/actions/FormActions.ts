import type {NullishDeep, OnyxValue} from 'react-native-onyx';
import Onyx from 'react-native-onyx';
import type {OnyxFormDraftKey, OnyxFormKey} from '@src/ONYXKEYS';
import type * as OnyxCommon from '@src/types/onyx/OnyxCommon';

function setIsLoading(formID: OnyxFormKey, isLoading: boolean) {
    Onyx.merge(formID, {isLoading});
}

function setErrors(formID: OnyxFormKey, errors: OnyxCommon.Errors) {
    Onyx.merge(formID, {errors});
}

function setErrorFields(formID: OnyxFormKey, errorFields: OnyxCommon.ErrorFields) {
    Onyx.merge(formID, {errorFields});
}

function clearErrors(formID: OnyxFormKey) {
    Onyx.merge(formID, {errors: null});
}

function clearErrorFields(formID: OnyxFormKey) {
    Onyx.merge(formID, {errorFields: null});
}

function setDraftValues(formID: OnyxFormKey, draftValues: NullishDeep<OnyxValue<OnyxFormDraftKey>>) {
    Onyx.merge(`${formID}Draft`, draftValues);
}

function clearDraftValues(formID: OnyxFormKey) {
    Onyx.set(`${formID}Draft`, null);
}

// function setDraftValues(formID: OnyxFormKeyWithoutDraft, draftValues: NullishDeep<KeyValueMapping[`${OnyxFormKeyWithoutDraft}Draft`]>) {
//     Onyx.merge(FormUtils.getDraftKey(formID), draftValues);
// }

/**
 * @param formID
 */
// function clearDraftValues(formID: OnyxFormKeyWithoutDraft) {
//     Onyx.merge(FormUtils.getDraftKey(formID), undefined);
// }

/**
 * @param draftID
 */
function clearDraftValuesByDraftId(formID: OnyxFormKey) {
    Onyx.set(`${formID}Draft`, {});
}

type UpdateDraftValuesForEditModelIdParams = {formID: OnyxFormKey; editFormUniqueId: string; lastEditFormUniqueId: string};

/**
 * @param draftID
 * @param editFormUniqueId
 * @param lastEditFormUniqueId
 */
function updateDraftValuesForEditModelId({formID, editFormUniqueId, lastEditFormUniqueId}: UpdateDraftValuesForEditModelIdParams) {
    if (editFormUniqueId === lastEditFormUniqueId) {
        return;
    }
    Onyx.set(`${formID}Draft`, {editFormUniqueId});
}

export {clearDraftValues, clearErrorFields, clearErrors, setDraftValues, setErrorFields, setErrors, setIsLoading, clearDraftValuesByDraftId, updateDraftValuesForEditModelId};

// export {setDraftValues, setErrorFields, setErrors, setIsLoading, clearDraftValues, clearDraftValuesByDraftId, updateDraftValuesForEditModelId};
