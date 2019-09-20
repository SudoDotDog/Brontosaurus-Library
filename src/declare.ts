/**
 * @author WMXPY
 * @namespace Brontosaurus_Library
 * @description Declare
 */

export type Category = {

    readonly name: string;
    readonly title: string;
};

export type Article = {

    readonly categories: string[];
    readonly title: string;
    readonly name: string;
    readonly path: string;

    readonly template?: string;
    readonly private?: boolean;
    readonly groups?: string[];
    readonly groupMode?: 'All' | 'OneOf';
};

export type GlobalTemplates = {

    readonly fourOFour?: string;
    readonly publicArticle?: string;
    readonly navigation?: string;
};

export type LibraryConfig = {

    readonly title: string;
    readonly index: string;
    readonly basePath: string;
    readonly favicon: string;

    readonly globalTemplates: GlobalTemplates;

    readonly categories: Category[];
    readonly articles: Article[];
};
