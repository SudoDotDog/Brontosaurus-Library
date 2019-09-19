/**
 * @author WMXPY
 * @namespace Brontosaurus_Library_Service
 * @description Article
 */

import { pathExists, readTextFile } from "@sudoo/io";
import { Converter } from "showdown";

export const renderArticle = async (path: string): Promise<string | null> => {

    const exist: boolean = await pathExists(path);

    if (!exist) {
        return null;
    }

    const content: string = await readTextFile(path);
    const converter: Converter = new Converter();

    return converter.makeHtml(content);
};
