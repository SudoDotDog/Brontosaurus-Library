/**
 * @author WMXPY
 * @namespace Brontosaurus_Library_Routes
 * @description Robot
 */

import { ROUTE_MODE, SudooExpressHandler, SudooExpressNextFunction, SudooExpressRequest, SudooExpressResponse } from "@sudoo/express";
import { BrontosaurusRoute } from "../basic/basic";
import { autoHook } from "../basic/hook";
import { ERROR_CODE, panic } from "../util/panic";

export class RobotRoute extends BrontosaurusRoute {

    public readonly path: string = '/robot.txt';
    public readonly mode: ROUTE_MODE = ROUTE_MODE.GET;

    public readonly groups: SudooExpressHandler[] = [
        autoHook.wrap(this._robotHandler.bind(this), 'Robot', true),
    ];

    private async _robotHandler(req: SudooExpressRequest, res: SudooExpressResponse, next: SudooExpressNextFunction): Promise<void> {

        try {

            res.agent.raw([
                'User-agent: *',
                'Allow: /',
            ].join('\n'));
        } catch (error) {

            this._log.error(`${req.path} - ${error.message} (${error.code})`);
            res.agent.fail(404, panic.code(ERROR_CODE.NOT_FOUND));
        } finally {
            next();
        }
    }
}
