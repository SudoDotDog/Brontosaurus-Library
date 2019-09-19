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

            this._articles.set(article.name, article);
        }
    }

    public getArticle(name: string): Article | null {

        if (this._articles.has(name)) {

            return this._articles.get(name) as Article;
        }

        return null;
    }
}
