/**
 * @author WMXPY
 * @namespace Brontosaurus_Library
 * @description Declare
 */

export type Article = {

    readonly name: string;
    readonly path: string;

    readonly template?: string;
    readonly private?: boolean;
    readonly groups?: string[];
    readonly groupMode?: 'All' | 'OneOf';
};

export type GlobalTemplates = {

    readonly publicArticle?: string;
};

export type LibraryConfig = {

    readonly basePath: string;

    readonly globalTemplates: GlobalTemplates;

    readonly articles: Article[];
};
