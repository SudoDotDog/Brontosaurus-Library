/**
 * @author WMXPY
 * @namespace Brontosaurus_Library_Util
 * @description Conf
 */

import * as Path from "path";
import { ERROR_CODE, panic } from "./panic";

export const pageLimit: number = 20;

// tslint:disable-next-line: variable-name


export const getEnvGettingText = () => {

    return `<script>if(!window.env){window.env={}};window.env.PORTAL_PATH="${process.env.PORTAL_PATH}"</script>`;
};

export const getApplicationKey = (): string => {

    if (process.env.BRONTOSAURUS_APPLICATION_KEY) {

        return String(process.env.BRONTOSAURUS_APPLICATION_KEY);
    }

    throw panic.code(ERROR_CODE.ENVIRONMENT_APPLICATION_KEY);
};

export const getPublicKey = () => {

    if (process.env.BRONTOSAURUS_PUBLIC_KEY) {

        return String(process.env.BRONTOSAURUS_PUBLIC_KEY).replace(/\|\|/g, '\n');
    }

    throw panic.code(ERROR_CODE.ENVIRONMENT_PUBLIC_KEY);
};

export const getPortalPath = (): string => {

    if (process.env.BRONTOSAURUS_PORTAL_PATH) {

        return String(process.env.BRONTOSAURUS_PORTAL_PATH);
    }

    throw panic.code(ERROR_CODE.ENVIRONMENT_PORTAL_PATH);
};

export const getLibraryPath = (): string => {

    if (process.env.BRONTOSAURUS_LIBRARY_PATH) {

        return String(process.env.BRONTOSAURUS_LIBRARY_PATH);
    }

    throw panic.code(ERROR_CODE.ENVIRONMENT_PORTAL_PATH);
};

export const getConfigPath = (): string => {

    if (process.env.BRONTOSAURUS_LIBRARY_CONFIG) {

        return String(process.env.BRONTOSAURUS_LIBRARY_CONFIG);
    }

    throw panic.code(ERROR_CODE.ENVIRONMENT_CONFIG_PATH);
};

export const getDefaultPublicArticleTemplate = (): string => {

    return Path.join(__dirname, '..', '..', 'template', 'article-public.ejs');
};

export const getDefaultNavigationTemplate = (): string => {

    return Path.join(__dirname, '..', '..', 'template', 'navigation.ejs');
};

export const isDevelopment = (): boolean => process.env.NODE_ENV === 'development';
