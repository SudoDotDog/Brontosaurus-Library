/**
 * @author WMXPY
 * @namespace Brontosaurus_Library_Routes
 * @description Basic
 */

import { ISudooExpressRoute, ROUTE_MODE, SudooExpressHandler } from "@sudoo/express";
import { SudooLog } from '@sudoo/log';
import { ConnorError } from "connor";

export abstract class BrontosaurusRoute implements ISudooExpressRoute {

    public abstract readonly path: string;
    public abstract readonly mode: ROUTE_MODE;
    public abstract readonly groups: SudooExpressHandler[];

    protected readonly _log: SudooLog = SudooLog.global;

    public onError(code: number, error: Error) {

        const err: ConnorError = error as any;

        return {
            code,
            message: JSON.stringify(String(err.message)),
        };
    }
}
