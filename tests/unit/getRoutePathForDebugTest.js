import getRoutePathForDebug from '@libs/getRoutePathForDebug';
import ROUTES from '@src/ROUTES';

describe('getRoutePathForDebug', () => {
    it('getRoutePathForDebug should return the correct route name', () => {
        const routeName = getRoutePathForDebug(ROUTES.REPORT_WITH_ID_DETAILS.route, {chatReports: []});

        const x = 0;
    });
});
