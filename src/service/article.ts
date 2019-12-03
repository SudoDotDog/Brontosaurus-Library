/**
 * @author WMXPY
 * @namespace Brontosaurus_Library_Service
 * @description Article
 */

import { pathExists, readTextFile } from "@sudoo/io";
import { render } from "ejs";
import { CategoryAgent } from "../agent/category";
import { ConfigAgent } from "../agent/config";
import { Article } from "../declare";
import { getLibraryPath } from "../util/conf";
import { renderMarkdown } from "../util/markdown";
import { PageRenderBuilder } from "./render";

export const renderFourOFour = async (authPath: string, loggedIn: boolean): Promise<string | null> => {

    const config: ConfigAgent = ConfigAgent.instance;

    const fourOFourPath: string = config.getFourOFourTemplate();

    const exist: boolean = await pathExists(fourOFourPath);

    if (!exist) {
        return null;
    }

    const template: string = await readTextFile(fourOFourPath);

    return render(template, {

        favicon: config.favicon,
        authPath,
        indexPath: getLibraryPath(),
        loggedIn,
        header: config.title,
        title: `404! Article Not Found Or Viewing Permission Required | ${config.title}`,
    });
};

export const createRenderArticleBuilder = async (
    article: Article,
): Promise<PageRenderBuilder | null> => {

    const config: ConfigAgent = ConfigAgent.instance;
    const category: CategoryAgent = CategoryAgent.instance;

    const articlePath: string = config.joinPath(article.path);
    const templatePath: string = article.template ? config.joinPath(article.template) : config.getPublicArticleTemplate();
    const styleSheetPath: string = config.getStyleSheet();
    const navigationPath: string = config.getNavigationTemplate();

    const exist: boolean = await pathExists(articlePath);

    if (!exist) {
        return null;
    }

    const templateExist: boolean = await pathExists(templatePath);

    if (!templateExist) {
        return null;
    }

    const content: string = await readTextFile(articlePath);
    const template: string = await readTextFile(templatePath);
    const styleSheet: string = await readTextFile(styleSheetPath);

    const html: string = renderMarkdown(content);

    return PageRenderBuilder.create(template, {

        navigationPath,

        parseLink: (target: Article) => [
            '',
            ...target.categories,
            target.name,
        ].join('/'),

        favicon: config.favicon,
        tree: category.tree,
        header: config.title,
        title: config.title,
        article: html,
        author: '',
        styleSheet,
    });
};

export const createRenderIndexBuilder = async (): Promise<PageRenderBuilder | null> => {

    const config: ConfigAgent = ConfigAgent.instance;
    const category: CategoryAgent = CategoryAgent.instance;

    const articlePath: string = config.joinPath(config.index);
    const templatePath: string = config.getPublicArticleTemplate();
    const styleSheetPath: string = config.getStyleSheet();
    const navigationPath: string = config.getNavigationTemplate();

    const exist: boolean = await pathExists(articlePath);

    if (!exist) {
        return null;
    }

    const templateExist: boolean = await pathExists(templatePath);

    if (!templateExist) {
        return null;
    }

    const content: string = await readTextFile(articlePath);
    const template: string = await readTextFile(templatePath);
    const styleSheet: string = await readTextFile(styleSheetPath);

    const html: string = renderMarkdown(content);

    return PageRenderBuilder.create(template, {

        navigationPath,

        parseLink: (target: Article) => [
            '',
            ...target.categories,
            target.name,
        ].join('/'),

        favicon: config.favicon,
        tree: category.tree,
        header: config.title,
        title: config.title,
        article: html,
        author: '',
        styleSheet,
    });
};
