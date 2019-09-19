/**
 * @author WMXPY
 * @namespace Brontosaurus_Library_Routes
 * @description Article
 */

import { ROUTE_MODE, SudooExpressHandler, SudooExpressNextFunction, SudooExpressRequest, SudooExpressResponse } from "@sudoo/express";
import { BrontosaurusRoute } from "../basic/basic";
import { autoHook } from "../basic/hook";

export class ArticleRoute extends BrontosaurusRoute {

    public readonly path: string = '/r/*';
    public readonly mode: ROUTE_MODE = ROUTE_MODE.GET;

    public readonly groups: SudooExpressHandler[] = [
        autoHook.wrap(this._articleHandler.bind(this), '/account/single - Single', true),
    ];

    private async _articleHandler(req: SudooExpressRequest, res: SudooExpressResponse, next: SudooExpressNextFunction): Promise<void> {

        try {


        } catch (err) {
            res.agent.fail(400, err);
        } finally {
            next();
        }
    }
}
