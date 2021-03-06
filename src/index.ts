/**
 * @author WMXPY
 * @namespace Brontosaurus_Library
 * @description Index
 */

import { SudooExpress, SudooExpressApplication } from '@sudoo/express';
import { LOG_LEVEL, SudooLog } from '@sudoo/log';
import { LibraryRoutes } from './basic/import';
import { isDevelopment } from './util/conf';

const setting: SudooExpressApplication = SudooExpressApplication.create('Brontosaurus-Library', '1');
setting.useCookieParser();

if (isDevelopment()) {
    setting.allowCrossOrigin();
    SudooLog.global.setLevel(LOG_LEVEL.VERBOSE);
} else {
    SudooLog.global.setLevel(LOG_LEVEL.INFO);
}

const app: SudooExpress = SudooExpress.create(setting);

// Health
app.health('/health');

app.routeList(LibraryRoutes);

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
app.host(9000);
SudooLog.global.info('Hosting at port 9000');
