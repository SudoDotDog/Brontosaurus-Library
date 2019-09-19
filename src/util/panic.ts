/**
 * @author WMXPY
 * @namespace Brontosaurus_Library_Util
 * @description Panic
 */

import { Panic } from 'connor';

export const MODULE_NAME = 'Brontosaurus-Library';

export enum ERROR_CODE {

    NOT_FOUND = 1404,
}

export const ERROR_LIST: Record<ERROR_CODE, string> = {

    [ERROR_CODE.NOT_FOUND]: 'Article Not Found',
};

export const panic: Panic<ERROR_CODE> = Panic.withDictionary(MODULE_NAME, ERROR_LIST);
