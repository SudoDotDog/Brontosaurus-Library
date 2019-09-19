/**
 * @author WMXPY
 * @namespace Brontosaurus_Library_Agent
 * @description Article
 */

export type Article = {

    readonly name: string;
    readonly path: string;
    readonly private?: boolean;
    readonly groups?: string[];
    readonly groupMode?: 'All' | 'OneOf';
};

export class ArticleAgent {

    public static get instance(): ArticleAgent {

        return this._instance;
    }

    private static readonly _instance: ArticleAgent = new ArticleAgent();

    private readonly _articles: Map<string, Article>;

    private constructor() {

        this._articles = new Map<string, Article>();
    }

    public init(articles: Article[]) {

        for (const article of articles) {

            this._articles.set(article.name, article);
        }
    }
}
