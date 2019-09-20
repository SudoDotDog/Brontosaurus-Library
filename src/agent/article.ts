/**
 * @author WMXPY
 * @namespace Brontosaurus_Library_Agent
 * @description Article
 */

import { Article } from "../declare";
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

        this.init(this._config.articles);
    }

    public init(articles: Article[]) {

        for (const article of articles) {

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
}
