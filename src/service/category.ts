/**
 * @author WMXPY
 * @namespace Brontosaurus_Library_Service
 * @description Category
 */

import { Article, Category } from "../declare";

export class CategoryTree {

    public static root(): CategoryTree {

        return new CategoryTree('$$root', '$$Root', 1, true);
    }

    public static create(name: string, title: string, level: number): CategoryTree {

        return new CategoryTree(name, title, level);
    }

    private readonly _isRoot: boolean;
    private readonly _level: number;
    private readonly _name: string;
    private readonly _title: string;
    private readonly _articles: Article[];
    private readonly _children: CategoryTree[];

    private constructor(name: string, title: string, level: number, isRoot: boolean = false) {

        this._isRoot = isRoot;
        this._level = level;
        this._name = name;
        this._title = title;
        this._articles = [];
        this._children = [];
    }

    public category(category: Category): CategoryTree {

        for (const child of this._children) {
            if (child._name === category.name) {
                return child;
            }
        }

        const newChild: CategoryTree = CategoryTree.create(category.name, category.title, this._level + 1);
        this._children.push(newChild);

        return newChild;
    }

    public addArticle(article: Article): this {

        this._articles.push(article);
        return this;
    }

    public toString(): string {

        return [
            `${'-'.repeat(this._level)}`,
        ].join('\n');
    }
}
