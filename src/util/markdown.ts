/**
 * @author WMXPY
 * @namespace Brontosaurus_Library_Util
 * @description Markdown
 */

import { load } from "js-yaml";
import { Converter } from "showdown";
import { Article, ArticleConfig } from "../declare";

export const renderMarkdown = (text: string): string => {

    const converter: Converter = new Converter({
        metadata: true,
        disableForced4SpacesIndentedSublists: true,
        excludeTrailingPunctuationFromURLs: true,
        ghCodeBlocks: true,
        ghCompatibleHeaderId: true,
        noHeaderId: false,
        omitExtraWLInCodeBlocks: true,
        strikethrough: true,
        tables: true,
        tasklists: true,
    });

    const html: string = converter.makeHtml(text);
    return html;
};

export const getArticleMetadata = (text: string): ArticleConfig => {

    const converter: Converter = new Converter({
        metadata: true,
        disableForced4SpacesIndentedSublists: true,
        excludeTrailingPunctuationFromURLs: true,
        ghCodeBlocks: true,
        ghCompatibleHeaderId: true,
        noHeaderId: false,
        omitExtraWLInCodeBlocks: true,
        strikethrough: true,
        tables: true,
        tasklists: true,
    });

    converter.makeHtml(text);
    const rawMetadata: string = converter.getMetadata(true) as string;
    const metadata: Article = load(rawMetadata) as any;

    return metadata;
};
