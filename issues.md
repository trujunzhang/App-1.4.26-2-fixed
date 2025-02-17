1 .cjs does not work with React Native
  fixed: sourceExts: [...(isE2ETesting ? e2eSourceExts : []), ...defaultSourceExts, ...defaultAdditionalExts, 'jsx'],


WithReportAndReportActionOrNotFoundProps

2. com.facebook.react.common.JavascriptException: Error: Could not find the Realm binary. Please consult our troubleshooting guide: https://www.mongodb.com/docs/realm-sdks/js/latest/#md:troubleshooting-missing-binary, js engine: hermes, stack:

/Volumes/MacUser/djzhang/Documents/Organizations/__CODING/WORKING/ieatta-three-apps/node_modules/realm/prebuilds/android/arm64-v8a/share/cmake/Realm/AcquireRealmDependency.cmake:38 (message):


/Volumes/MacUser/djzhang/Documents/Organizations/__CODING/WORKING/ieatta-three-apps/node_modules/realm/prebuilds/android/arm64-v8a/share/cmake/Realm/AcquireRealmDependency.cmake:38 (message):

3. react-native-date-picker is not installed correctly.

https://github.com/henninghall/react-native-date-picker

android/app/build.gradle:
android/app/build.gradle:
   
/**
 * Set this to true to Run Proguard on Release builds to minify the Java bytecode.
 */
//def enableProguardInReleaseBuilds = true
def enableProguardInReleaseBuilds = false

4. Cannot read property 'isOffline' of undefined, click 'Edit Restaurant/Event/Recipe/XXX' button

src/components/FormAlertWrapper.tsx
src/components/FormAlertWrapper.tsx

            {/* {children(!!network.isOffline)} */}
            {children(false)}
