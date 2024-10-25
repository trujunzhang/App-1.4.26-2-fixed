module.exports = {
    project: {
        ios: {
            sourceDir: 'ios',
            unstable_reactLegacyComponentNames: ['CameraView'],
        },
        android: {
            unstable_reactLegacyComponentNames: ['CameraView'],
        },
    },
    assets: ['./assets/fonts/native'],
};
