/**
 * @author WMXPY
 * @namespace Brontosaurus_Library_Util
 * @description Markdown
 */

import { Converter } from "showdown";

export const renderMarkdown = (text: string): string => {

    const converter: Converter = new Converter({
        omitExtraWLInCodeBlocks: true,
        noHeaderId: false,
        ghCompatibleHeaderId: true,
        excludeTrailingPunctuationFromURLs: true,
        strikethrough: true,
        tables: true,
        ghCodeBlocks: true,
        tasklists: true,
    });
    const html: string = converter.makeHtml(text);

    return html;
};
