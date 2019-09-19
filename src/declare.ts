/**
 * @author WMXPY
 * @namespace Brontosaurus_Library
 * @description Declare
 */

export type Article = {

    readonly name: string;
    readonly path: string;
    readonly private?: boolean;
    readonly groups?: string[];
    readonly groupMode?: 'All' | 'OneOf';
};

export type LibraryConfig = {

    readonly basePath: string;
    readonly articles: Article[];
};
