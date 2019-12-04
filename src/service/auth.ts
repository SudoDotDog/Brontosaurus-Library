/**
 * @author WMXPY
 * @namespace Brontosaurus_Library_Service
 * @description Auth
 */

import { Authorization, AuthToken } from "@brontosaurus/node";
import { getApplicationKey, getLibraryPath, getPortalPath, getPublicKey } from "../util/conf";

export const auth: Authorization = Authorization.create(
    getPortalPath(),
    getApplicationKey(),
    getPublicKey(),
);

export const verifyToken = (token: AuthToken | null, groups: string[], mode: 'All' | 'OneOf'): boolean => {

    if (token && token.authenticate()) {

        if (mode === 'All') {
            if (token.hasGroups(...groups)) {
                return true;
            }
        } else if (mode === 'OneOf') {
            if (token.hasOneOfGroups(...groups)) {
                return true;
            }
        }
    }
    return false;
};

export const buildAuthPath = (originalUrl: string): string => {

    const path = [
        getPortalPath(),
        '/',
        '?key=',
        getApplicationKey(),
        '&cb=',
        getLibraryPath(),
        originalUrl,
    ].join('');

    return path;
};

export const buildLogoutPath = (originalUrl: string): string => {

    const path = [
        getLibraryPath(),
        originalUrl,
        '?logout=true',
    ].join('');

    return path;
};

export const buildBufferPath = (originalUrl: string): string => {

    const path = [
        getLibraryPath(),
        originalUrl,
    ].join('');

    return path;
};
