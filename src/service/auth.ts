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

export const verifyToken = (principal: string, groups: string[], mode: 'All' | 'OneOf'): boolean => {

    const token: AuthToken | null = auth.token(principal);
    console.log(principal, token);

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
