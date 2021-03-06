/**
 * @author WMXPY
 * @namespace Brontosaurus_Library_Routes
 * @description Basic
 */

import { ISudooExpressRoute, ROUTE_MODE, SudooExpressErrorInfo, SudooExpressHandler } from "@sudoo/express";
import { SudooLog } from '@sudoo/log';
import { ConnorError } from "connor";

export abstract class BrontosaurusRoute implements ISudooExpressRoute {

    protected readonly _log: SudooLog = SudooLog.global;

    public abstract readonly path: string;
    public abstract readonly mode: ROUTE_MODE;
    public abstract readonly groups: SudooExpressHandler[];

    public onError(code: number, error: Error): SudooExpressErrorInfo {

        const err: ConnorError = error as any;

        return {
            code,
            message: JSON.stringify(String(err.message)),
        };
    }
}
