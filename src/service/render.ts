/**
 * @author WMXPY
 * @namespace Brontosaurus_Library_Service
 * @description Render
 */

import { AuthToken } from "@brontosaurus/node";
import { render } from "ejs";
import { Article } from "../declare";
import { CategoryTree } from "./category";

export type PageRenderDataStructure = {

    token?: AuthToken;

    readonly navigationPath: string;

    readonly parseLink: (target: Article) => string;

    readonly favicon: string;
    readonly tree: CategoryTree;
    readonly header: string;
    readonly title: string;
    readonly article: string;
    readonly author: string;
    readonly styleSheet: string;
};

export class PageRenderBuilder {

    public static create(templatePath: string, init: PageRenderDataStructure) {

        return new PageRenderBuilder(templatePath, init);
    }

    private readonly _templatePath: string;
    private readonly _structure: PageRenderDataStructure;

    private constructor(templatePath: string, init: PageRenderDataStructure) {

        this._templatePath = templatePath;
        this._structure = init;
    }

    public render() {

        return render(this._templatePath, this._structure);
    }
}
