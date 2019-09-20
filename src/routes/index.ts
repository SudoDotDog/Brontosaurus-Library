/**
 * @author WMXPY
 * @namespace Brontosaurus_Library_Routes
 * @description Index
 */

import { ROUTE_MODE, SudooExpressHandler, SudooExpressNextFunction, SudooExpressRequest, SudooExpressResponse } from "@sudoo/express";
import { ConfigAgent } from "../agent/config";
import { BrontosaurusRoute } from "../basic/basic";
import { autoHook } from "../basic/hook";
import { renderIndex } from "../service/article";
import { ERROR_CODE, panic } from "../util/panic";

export class IndexRoute extends BrontosaurusRoute {

    public readonly path: string = '/';
    public readonly mode: ROUTE_MODE = ROUTE_MODE.GET;

    public readonly groups: SudooExpressHandler[] = [
        autoHook.wrap(this._indexHandler.bind(this), 'Index', true),
    ];

    private async _indexHandler(req: SudooExpressRequest, res: SudooExpressResponse, next: SudooExpressNextFunction): Promise<void> {

        try {

            const html: string | null = await renderIndex();
            res.agent.raw(html);
        } catch (error) {

            this._log.error(`${req.path} - ${error.message} (${error.code})`);
            res.agent.fail(404, panic.code(ERROR_CODE.NOT_FOUND));
        } finally {
            next();
        }
    }
}
