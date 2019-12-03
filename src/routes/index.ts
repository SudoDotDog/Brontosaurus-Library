/**
 * @author WMXPY
 * @namespace Brontosaurus_Library_Routes
 * @description Index
 */

import { ROUTE_MODE, SudooExpressHandler, SudooExpressNextFunction, SudooExpressRequest, SudooExpressResponse } from "@sudoo/express";
import { HTTP_RESPONSE_CODE } from "@sudoo/magic";
import { BrontosaurusRoute } from "../basic/basic";
import { autoHook } from "../basic/hook";
import { createRenderIndexBuilder } from "../service/article";
import { PageRenderBuilder } from "../service/render";
import { ERROR_CODE, panic } from "../util/panic";

export class IndexRoute extends BrontosaurusRoute {

    public readonly path: string = '/';
    public readonly mode: ROUTE_MODE = ROUTE_MODE.GET;

    public readonly groups: SudooExpressHandler[] = [
        autoHook.wrap(this._indexHandler.bind(this), 'Index', true),
    ];

    private async _indexHandler(req: SudooExpressRequest, res: SudooExpressResponse, next: SudooExpressNextFunction): Promise<void> {

        try {

            const page: PageRenderBuilder | null = await createRenderIndexBuilder();

            if (!page) {
                throw panic.code(ERROR_CODE.FILE_NOT_FOUND);
            }

            const raw: string = page.render();
            res.agent.raw(raw);
        } catch (error) {

            this._log.error(`${req.path} - ${error.message} (${error.code})`);
            res.agent.fail(HTTP_RESPONSE_CODE.NOT_FOUND, panic.code(ERROR_CODE.NOT_FOUND));
        } finally {
            next();
        }
    }
}
