/**
 * @author WMXPY
 * @namespace Brontosaurus_Library_Service
 * @description Auth
 */

import { Authorization, AuthToken } from "@brontosaurus/node";

// tslint:disable-next-line: variable-name
export const Get_Brontosaurus_Server = () => process.env.AUTH_SERVER;
// tslint:disable-next-line: variable-name
export const Get_Brontosaurus_Application_key = () => 'RPN_GO';
// tslint:disable-next-line: variable-name
export const Get_Brontosaurus_Public_key = () => {
    const key = process.env.PUBLIC_KEY;
    if (!key) {
        return '';
    }
    return key.replace(/\|\|/g, '\n');
};

export const auth: Authorization = Authorization.create(
    Get_Brontosaurus_Server(),
    Get_Brontosaurus_Application_key(),
    Get_Brontosaurus_Public_key(),
);

export const verifyToken = (principal: string, groups: string[]): boolean => {

    const token: AuthToken | null = auth.token(principal);

    if (token && token.authenticate()) {
        if (token.hasGroups(...groups)) {
            return true;
        }
    }
    return false;
};
