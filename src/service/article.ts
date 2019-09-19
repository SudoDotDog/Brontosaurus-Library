/**
 * @author WMXPY
 * @namespace Brontosaurus_Library_Service
 * @description Article
 */

import { pathExists, readTextFile } from "@sudoo/io";
import { render } from "ejs";
import { Converter } from "showdown";

export const renderArticle = async (articlePath: string, templatePath: string): Promise<string | null> => {

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
        article: html,
    });
};
