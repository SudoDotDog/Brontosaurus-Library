/**
 * @author WMXPY
 * @namespace Brontosaurus_Library_Agent
 * @description Category
 */

import { Article, Category } from "../declare";
import { CategoryTree } from "../service/category";
import { ConfigAgent } from "./config";

export class CategoryAgent {

    public static get instance(): CategoryAgent {

        return this._instance;
    }

    private static readonly _instance: CategoryAgent = new CategoryAgent();

    private readonly _dictionary: Map<string, Category>;
    private readonly _tree: CategoryTree;
    private readonly _config: ConfigAgent;

    private constructor() {

        this._dictionary = new Map<string, Category>();

        this._tree = CategoryTree.root();
        this._config = ConfigAgent.instance;

        this.init(this._config.articles, this._config.categories);
    }

    public get tree(): CategoryTree {

        return this._tree;
    }

    public init(articles: Article[], categories: Category[]): any {

        for (const category of categories) {

            this._dictionary.set(category.name, category);
        }

        for (const article of articles) {

            let current: CategoryTree = this._tree;
            for (const category of article.categories) {

                const parsed: Category | null = this.lookUpCategory(category);

                if (!parsed) {
                    return null;
                }

                current = current.category(parsed);
            }

            current.addArticle(article);
        }

        return this;
    }

    public lookUpCategory(name: string): Category | null {

        if (this._dictionary.has(name)) {

            return this._dictionary.get(name) as Category;
        }

        return null;
    }
}
