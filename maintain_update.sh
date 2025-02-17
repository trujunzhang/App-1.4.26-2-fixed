#!/bin/bash

android_files=(
   // android/app/build.gradle
   // def enableProguardInReleaseBuilds = false

   // android/app/proguard-rules.pro
)

function lib_tools {
    different_fold_files=(
        # config
        "config/webpack/webpack.common.js"

        # languages
        "src/languages"

        # styles
        "src/styles/pages"
        "src/styles/index.ts"

        "src/styles/variables.ts"

        # components
        "src/components/Debug"
        "src/components/SignInButtons/GoogleSignButton"

        "src/components/Icon/Expensicons.ts"
        "src/components/Icon/Illustrations.ts"

        "src/components/Ieatta"

        # libs
        "src/libs/getRoutePathForDebug"

        # src/libs/actions/Timing.ts
        #    import Firebase from '@libs/Firebase';   ==> import Firebase from '@libs/Firebase/trace';
        "src/libs/Firebase"

        # libs(actions)
        "src/libs/actions/UserFB.ts"

        # tests
        "tests/unit/getRoutePathForDebugTest.js"
        "tests/unit/firebase"
        "tests/unit/Style.spec.js"
    )

    echo "${different_fold_files[@]}"

}
