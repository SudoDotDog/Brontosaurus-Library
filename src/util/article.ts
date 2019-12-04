/**
 * @author WMXPY
 * @namespace Brontosaurus_Library_Util
 * @description Article
 */

import { AuthToken } from "@brontosaurus/node";
import { Article } from "../declare";

export const isArticleVisible = (article: Article, token: AuthToken | null): boolean => {

    if (article.hidden) {
        return false;
    }

    if (!token) {
        return !article.private;
    }

    if (!article.private) {
        return true;
    }

    if (!Array.isArray(article.groups)) {
        return false;
    }

    for (const group of article.groups) {
        if (!token.groups.includes(group)) {
            return false;
        }
    }

    return true;
};
