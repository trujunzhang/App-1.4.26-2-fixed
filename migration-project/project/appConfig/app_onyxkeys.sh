#!/bin/bash

function app_onyxkeys_FirebaseSyncStatus() {
    index_js="src/types/onyx/index.ts"

    add_lines_in_file           \
        "$index_js"            \
        "import type FirebaseSyncStatus " \
        "import type ExpensifyCardSettings from './ExpensifyCardSettings';"  \
        "import type FirebaseSyncStatus from './FirebaseSyncStatus';"        \
        "check"


    add_lines_in_file                    \
        "$index_js"                      \
        "FirebaseSyncStatus,"            \
        "ValidateMagicCodeAction,"       \
        "    FirebaseSyncStatus,"        \
        "check"

}

function app_onyxkeys_add_lines() {
    config_js="src/ONYXKEYS.ts"

    add_lines_in_file           \
        "$config_js"            \
        "import type \* as IeattaFormTypes" \
        "import type \* as FormTypes from './types/form';"      \
        "import type \* as IeattaFormTypes from './types/form/ieatta';" \
        "check"


    # =========================== keys ===============================
    # =============================  ===============================
    keys_line="const ONYXKEYS = {"
    app_keys_lines=(
        "    FIREBASE_CURRENT_SYNC_ID: 'firebaseCurrentSyncID',"
        "    RESTAURANT_ID_IN_SIDEBAR: 'restaurantIDInSidebar',"
        ""
        "    /** Holds the status of the firebase sync */"
        "    IS_FB_FIRST_SYNC: 'isFBFirstSync',"
        "    FIREBASE_SYNC_STATUS: 'firebaseSyncStatus',"
        ""
    )
    join_by app_keys_strings "\n" "${app_keys_lines[@]}"

    add_lines_in_file \
         "$config_js" \
         "FIREBASE_CURRENT_SYNC_ID" \
         "$keys_line" \
         "$app_keys_strings"  \
         "check"

    keys_type_line="type OnyxValuesMapping = {"
    app_type_keys_lines=(
        "    [ONYXKEYS.FIREBASE_CURRENT_SYNC_ID]: string;"
        "    [ONYXKEYS.RESTAURANT_ID_IN_SIDEBAR]: string;"
        "    [ONYXKEYS.IS_FB_FIRST_SYNC]: boolean;"
        "    [ONYXKEYS.FIREBASE_SYNC_STATUS]: OnyxTypes.FirebaseSyncStatus;"
    )
    join_by app_type_keys_strings "\n" "${app_type_keys_lines[@]}"

    add_lines_in_file \
         "$config_js" \
         "OnyxTypes.FirebaseSyncStatus" \
         "$keys_type_line" \
         "$app_type_keys_strings"  \
         "check"



    # =========================== Forms ===============================
    # =============================  ===============================
    forms_line="FORMS: {"
    form_keys_lines=(
        "        /\*\* Ieatta edit forms \*/"
        "        IEATTA_RESTAURANT: 'ieattaRestaurant',"
        "        IEATTA_RESTAURANT_DRAFT: 'ieattaRestaurantDraft',"
        "        IEATTA_EVENT: 'ieattaEvent',"
        "        IEATTA_EVENT_DRAFT: 'ieattaEventDraft',"
        "        IEATTA_RECIPE: 'ieattaRecipe',"
        "        IEATTA_RECIPE_DRAFT: 'ieattaRecipeDraft',"
        "        IEATTA_REVIEW: 'ieattaReview',"
        "        IEATTA_REVIEW_DRAFT: 'ieattaReviewDraft',"
        "        IEATTA_PHOTO: 'ieattaPhoto',"
        "        IEATTA_PHOTO_DRAFT: 'ieattaPhotoDraft',"
        ""
    )
    join_by form_keys_strings "\n" "${form_keys_lines[@]}"

    add_lines_in_file \
         "$config_js" \
         "ieattaRestaurantDraft" \
         "$forms_line" \
         "$form_keys_strings"  \
         "check"


    form_type_line="type OnyxFormValuesMapping = {"
    form_type_keys_lines=(
        "    /** Ieatta edit forms */"
        "    [ONYXKEYS.FORMS.IEATTA_RESTAURANT]: IeattaFormTypes.EditRestaurantForm;"
        "    [ONYXKEYS.FORMS.IEATTA_EVENT]: IeattaFormTypes.EditEventForm;"
        "    [ONYXKEYS.FORMS.IEATTA_RECIPE]: IeattaFormTypes.EditRecipeForm;"
        "    [ONYXKEYS.FORMS.IEATTA_REVIEW]: IeattaFormTypes.EditReviewForm;"
        "    [ONYXKEYS.FORMS.IEATTA_PHOTO]: IeattaFormTypes.EditPhotoForm;"
        ""
    )
    join_by form_type_keys_strings "\n" "${form_type_keys_lines[@]}"

    add_lines_in_file \
         "$config_js" \
         "IeattaFormTypes.EditRestaurantForm" \
         "$form_type_line" \
         "$form_type_keys_strings"  \
         "check"

}

function EDIT_app_onyxkeys() {
    step=$((step + 1))
    info "Start editing app onyxkeys"

    copy_folder_from_source_to_dest "src/types/form/ieatta"
    copy_file_from_source_to_dest "src/types/onyx/FirebaseSyncStatus.ts"

    app_onyxkeys_add_lines
    app_onyxkeys_FirebaseSyncStatus
}
