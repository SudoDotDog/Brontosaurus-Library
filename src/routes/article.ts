/**
 * @author WMXPY
 * @namespace Brontosaurus_Library_Routes
 * @description Article
 */

import { ROUTE_MODE, SudooExpressHandler, SudooExpressNextFunction, SudooExpressRequest, SudooExpressResponse } from "@sudoo/express";
import { BrontosaurusRoute } from "../basic/basic";
import { autoHook } from "../basic/hook";
import { ERROR_CODE, panic } from "../util/panic";

export class ArticleRoute extends BrontosaurusRoute {

    public readonly path: string = '/r/:article';
    public readonly mode: ROUTE_MODE = ROUTE_MODE.GET;

    public readonly groups: SudooExpressHandler[] = [
        autoHook.wrap(this._articleHandler.bind(this), '/account/single - Single', true),
    ];

    private async _articleHandler(req: SudooExpressRequest, res: SudooExpressResponse, next: SudooExpressNextFunction): Promise<void> {

        try {

            const article: string = req.params.article;

        } catch (error) {

            this._log.error(`${req.path} - ${error.message} (${error.code})`);
            res.agent.fail(404, panic.code(ERROR_CODE.NOT_FOUND));
        } finally {
            next();
        }
    }
}
