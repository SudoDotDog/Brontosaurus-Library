/**
 * @author WMXPY
 * @namespace Brontosaurus_Library
 * @description Declare
 */

export type Category = {

    readonly name: string;
    readonly title: string;
};

export type ArticleConfig = {

    readonly categories: string[];
    readonly title: string;
    readonly author: string;
    readonly name: string;

    readonly template?: string;
    readonly styleSheet?: string;
    readonly private?: boolean;
    readonly hidden?: boolean;
    readonly groups?: string[];
    readonly groupMode?: 'All' | 'OneOf';
};

export type Article = {

    readonly path: string;
} & ArticleConfig;

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
    readonly globalStyleSheet: string;

    readonly categories: Category[];
    readonly paths: string[];
};
