/**
 * @author WMXPY
 * @namespace Brontosaurus_Library_Agent
 * @description Article
 */

import * as Fs from "fs";
import { Article, ArticleConfig } from "../declare";
import { getArticleMetadata } from "../util/markdown";
import { ConfigAgent } from "./config";

export class ArticleAgent {

    public static get instance(): ArticleAgent {

        return this._instance;
    }

    private static readonly _instance: ArticleAgent = new ArticleAgent();

    private readonly _articles: Map<string, Article>;
    private readonly _config: ConfigAgent;

    private constructor() {

        this._articles = new Map<string, Article>();
        this._config = ConfigAgent.instance;

        this.initSync(this._config.paths);
    }

    public get articles(): Article[] {

        return [...this._articles.values()];
    }

    public initSync(paths: string[]): void {

        for (const path of paths) {

            const article: Article = this._makeArticle(path);

            const query: string = [...article.categories, article.name].join('/');
            this._articles.set(query, article);
        }
    }

    public getArticle(stack: string[]): Article | null {

        const query: string = stack.join('/');
        if (this._articles.has(query)) {

            return this._articles.get(query) as Article;
        }

        return null;
    }

    private _makeArticle(path: string): Article {

        const text: string = Fs.readFileSync(this._config.joinPath(path), 'utf8');
        const config: ArticleConfig = getArticleMetadata(text);

        return {
            ...config,
            path,
        };
    }
}
