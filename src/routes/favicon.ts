/**
 * @author WMXPY
 * @namespace Brontosaurus_Library_Routes
 * @description Robot
 */

import { ROUTE_MODE, SudooExpressHandler, SudooExpressNextFunction, SudooExpressRequest, SudooExpressResponse } from "@sudoo/express";
import { ConfigAgent } from "../agent/config";
import { BrontosaurusRoute } from "../basic/basic";
import { autoHook } from "../basic/hook";
import { ERROR_CODE, panic } from "../util/panic";

export class FaviconRoute extends BrontosaurusRoute {

    public readonly path: string = '/favicon.ico';
    public readonly mode: ROUTE_MODE = ROUTE_MODE.GET;

    public readonly groups: SudooExpressHandler[] = [
        autoHook.wrap(this._faviconRoute.bind(this), 'Favicon', true),
    ];

    private readonly _config: ConfigAgent = ConfigAgent.instance;

    private async _faviconRoute(req: SudooExpressRequest, res: SudooExpressResponse, next: SudooExpressNextFunction): Promise<void> {

        try {

            res.agent.redirect(this._config.favicon);
        } catch (error) {

            this._log.error(`${req.path} - ${error.message} (${error.code})`);
            res.agent.fail(404, panic.code(ERROR_CODE.NOT_FOUND));
        } finally {
            next();
        }
    }
}
