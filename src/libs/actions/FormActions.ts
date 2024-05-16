import Onyx from 'react-native-onyx';
import type {KeyValueMapping, NullishDeep} from 'react-native-onyx';
import {satisfies} from 'semver';
import FormUtils from '@libs/FormUtils';
import type {OnyxFormKey} from '@src/ONYXKEYS';
import type {Form} from '@src/types/onyx';
import type * as OnyxCommon from '@src/types/onyx/OnyxCommon';

type ExcludeDraft<T> = T extends `${string}Draft` ? never : T;
type OnyxFormKeyWithoutDraft = ExcludeDraft<OnyxFormKey>;

function setIsLoading(formID: OnyxFormKey, isLoading: boolean) {
    Onyx.merge(formID, {isLoading} satisfies Form);
}

function setErrors(formID: OnyxFormKey, errors: OnyxCommon.Errors) {
    Onyx.merge(formID, {errors} satisfies Form);
}

function setErrorFields(formID: OnyxFormKey, errorFields: OnyxCommon.ErrorFields) {
    Onyx.merge(formID, {errorFields} satisfies Form);
}

function setDraftValues(formID: OnyxFormKeyWithoutDraft, draftValues: NullishDeep<KeyValueMapping[`${OnyxFormKeyWithoutDraft}Draft`]>) {
    Onyx.merge(FormUtils.getDraftKey(formID), draftValues);
}

/**
 * @param formID
 */
function clearDraftValues(formID: OnyxFormKeyWithoutDraft) {
    Onyx.merge(FormUtils.getDraftKey(formID), undefined);
}

/**
 * @param draftID
 */
function clearDraftValuesByDraftId(draftID: OnyxFormKey) {
    Onyx.set(draftID, {});
}

type UpdateDraftValuesForEditModelIdParams = {draftID: OnyxFormKey; editFormUniqueId: string; lastEditFormUniqueId: string};

/**
 * @param draftID
 */
function updateDraftValuesForEditModelId({draftID, editFormUniqueId, lastEditFormUniqueId}: UpdateDraftValuesForEditModelIdParams) {
    if (editFormUniqueId === lastEditFormUniqueId) {
        return;
    }
    Onyx.set(draftID, {editFormUniqueId} satisfies Form);
}

export {setDraftValues, setErrorFields, setErrors, setIsLoading, clearDraftValues, clearDraftValuesByDraftId, updateDraftValuesForEditModelId};
