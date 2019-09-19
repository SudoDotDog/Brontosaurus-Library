/**
 * @author WMXPY
 * @namespace Brontosaurus_Library_Util
 * @description Panic
 */

import { Panic } from 'connor';

export const MODULE_NAME = 'Brontosaurus-Library';

export enum ERROR_CODE {

    NOT_FOUND = 1404,

    ENVIRONMENT_CONFIG_PATH = 2005,
    CONFIG_PATH_NOT_EXIST = 2015,

    ARTICLE_NOT_FOUND = 3404,
}

export const ERROR_LIST: Record<ERROR_CODE, string> = {

    [ERROR_CODE.NOT_FOUND]: 'Article Not Found',

    [ERROR_CODE.ENVIRONMENT_CONFIG_PATH]: 'Config Path Is Required Within Environment Variable',
    [ERROR_CODE.CONFIG_PATH_NOT_EXIST]: 'Config Path "{}" Not Exist',

    [ERROR_CODE.ARTICLE_NOT_FOUND]: 'Article: "{}" not found',
};

export const panic: Panic<ERROR_CODE> = Panic.withDictionary(MODULE_NAME, ERROR_LIST);
