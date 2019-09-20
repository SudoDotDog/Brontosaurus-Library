/**
 * @author WMXPY
 * @namespace Brontosaurus_Library_Util
 * @description Panic
 */

import { Panic } from 'connor';

export const MODULE_NAME = 'Brontosaurus-Library';

export enum ERROR_CODE {

    INVALID_LIBRARY_CONFIG = 1000,
    NOT_FOUND = 1404,

    ENVIRONMENT_PORTAL_PATH = 2004,
    ENVIRONMENT_CONFIG_PATH = 2005,
    ENVIRONMENT_LIBRARY_PATH = 2006,
    ENVIRONMENT_APPLICATION_KEY = 2007,
    ENVIRONMENT_PUBLIC_KEY = 2008,

    CONFIG_PATH_NOT_EXIST = 2015,

    FILE_NOT_FOUND = 3403,
    ARTICLE_NOT_FOUND = 3404,

    INVALID_TOKEN = 4001,
}

export const ERROR_LIST: Record<ERROR_CODE, string> = {

    [ERROR_CODE.INVALID_LIBRARY_CONFIG]: 'Invalid Library Config: "{}"',
    [ERROR_CODE.NOT_FOUND]: 'Article Not Found',

    [ERROR_CODE.ENVIRONMENT_PORTAL_PATH]: 'Portal Path Is Required Within Environment Variable',
    [ERROR_CODE.ENVIRONMENT_CONFIG_PATH]: 'Config Path Is Required Within Environment Variable',
    [ERROR_CODE.ENVIRONMENT_LIBRARY_PATH]: 'Library Path Is Required Within Environment Variable',
    [ERROR_CODE.ENVIRONMENT_APPLICATION_KEY]: 'Application Key Path Is Required Within Environment Variable',
    [ERROR_CODE.ENVIRONMENT_PUBLIC_KEY]: 'Public Key Path Is Required Within Environment Variable',

    [ERROR_CODE.CONFIG_PATH_NOT_EXIST]: 'Config Path "{}" Not Exist',

    [ERROR_CODE.FILE_NOT_FOUND]: 'File for article: "{}" not found',
    [ERROR_CODE.ARTICLE_NOT_FOUND]: 'Article: "{}" not found',

    [ERROR_CODE.INVALID_TOKEN]: 'Invalid Token',
};

export const panic: Panic<ERROR_CODE> = Panic.withDictionary(MODULE_NAME, ERROR_LIST);
