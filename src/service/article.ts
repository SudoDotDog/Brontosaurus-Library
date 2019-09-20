/**
 * @author WMXPY
 * @namespace Brontosaurus_Library_Service
 * @description Article
 */

import { pathExists, readTextFile } from "@sudoo/io";
import { render } from "ejs";
import { Converter } from "showdown";
import { CategoryAgent } from "../agent/category";
import { ConfigAgent } from "../agent/config";
import { Article } from "../declare";
import { getLibraryPath } from "../util/conf";

export const renderFourOFour = async (authPath: string, loggedIn: boolean): Promise<string | null> => {

    const config: ConfigAgent = ConfigAgent.instance;

    const fourOFourPath: string = config.getFourOFourTemplate();

    const exist: boolean = await pathExists(fourOFourPath);

    if (!exist) {
        return null;
    }

    const template: string = await readTextFile(fourOFourPath);

    return render(template, {

        authPath,
        indexPath: getLibraryPath(),
        loggedIn,
        title: config.title,
    });
};

export const renderArticle = async (
    article: Article,
): Promise<string | null> => {

    const config: ConfigAgent = ConfigAgent.instance;
    const category: CategoryAgent = CategoryAgent.instance;

    const articlePath: string = config.joinPath(article.path);
    const templatePath: string = article.template ? config.joinPath(article.template) : config.getPublicArticleTemplate();
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

    const converter: Converter = new Converter();
    const html: string = converter.makeHtml(content);

    return render(template, {

        navigationPath,

        parseLink: (target: Article) => [
            '',
            ...target.categories,
            target.name,
        ].join('/'),

        tree: category.tree,
        title: config.title,
        article: html,
    });
};

export const renderIndex = async (): Promise<string | null> => {

    const config: ConfigAgent = ConfigAgent.instance;
    const category: CategoryAgent = CategoryAgent.instance;

    const articlePath: string = config.joinPath(config.index);
    const templatePath: string = config.getPublicArticleTemplate();
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

    const converter: Converter = new Converter();
    const html: string = converter.makeHtml(content);

    return render(template, {

        navigationPath,

        parseLink: (target: Article) => [
            '',
            ...target.categories,
            target.name,
        ].join('/'),

        tree: category.tree,
        title: config.title,
        article: html,
    });
};
