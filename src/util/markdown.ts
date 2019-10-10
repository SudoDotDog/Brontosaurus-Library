/**
 * @author WMXPY
 * @namespace Brontosaurus_Library_Util
 * @description Markdown
 */

import { Converter } from "showdown";

export const renderMarkdown = (text: string): string => {

    const converter: Converter = new Converter({
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
