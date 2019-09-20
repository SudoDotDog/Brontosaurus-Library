/**
 * @author WMXPY
 * @namespace Brontosaurus_Library_Routes
 * @description Article
 */

import { ROUTE_MODE, SudooExpressHandler, SudooExpressNextFunction, SudooExpressRequest, SudooExpressResponse } from "@sudoo/express";
import { ArticleAgent } from "../agent/article";
import { CategoryAgent } from "../agent/category";
import { ConfigAgent } from "../agent/config";
import { BrontosaurusRoute } from "../basic/basic";
import { autoHook } from "../basic/hook";
import { Article } from "../declare";
import { renderArticle } from "../service/article";
import { verifyToken } from "../service/auth";
import { getLibraryPath, getPortalPath } from "../util/conf";
import { ERROR_CODE, panic } from "../util/panic";

export class ArticleRoute extends BrontosaurusRoute {

    public readonly path: string = '*';
    public readonly mode: ROUTE_MODE = ROUTE_MODE.GET;

    public readonly groups: SudooExpressHandler[] = [
        autoHook.wrap(this._articleHandler.bind(this), 'Article', true),
    ];

    private readonly _article: ArticleAgent = ArticleAgent.instance;
    private readonly _category: CategoryAgent = CategoryAgent.instance;
    private readonly _config: ConfigAgent = ConfigAgent.instance;

    private async _articleHandler(req: SudooExpressRequest, res: SudooExpressResponse, next: SudooExpressNextFunction): Promise<void> {

        try {

            const stack: string[] = req.path.split('/').filter(Boolean);
            const article: Article | null = this._article.getArticle(stack);

            if (!article) {
                throw panic.code(ERROR_CODE.ARTICLE_NOT_FOUND, stack.join('/'));
            }

            const token: string | undefined = req.query.token;
            if (token) {
                res.cookie('token', token);
            }

            if (article.groups) {

                const cookie: string | undefined = req.cookies.token;

                if (!cookie) {
                    const path = [
                        getPortalPath(),
                        '/',
                        '?key=RPN_GO&cb=',
                        getLibraryPath(),
                        req.originalUrl,
                    ].join('');
                    res.agent.redirect(path);
                    return;
                }

                const result: boolean = verifyToken(cookie, article.groups, article.groupMode || 'All');

                if (!result) {
                    throw panic.code(ERROR_CODE.INVALID_TOKEN);
                }
            }

            const html: string | null = await renderArticle(article);

            if (!html) {
                const templatePath: string = article.template ? this._config.joinPath(article.template) : this._config.getPublicArticleTemplate();
                throw panic.code(ERROR_CODE.FILE_NOT_FOUND, stack.join('/'), templatePath);
            }

            res.agent.raw(html);
        } catch (error) {

            this._log.error(`${req.path} - ${error.message} (${error.code})`);
            res.agent.fail(404, panic.code(ERROR_CODE.NOT_FOUND));
        } finally {
            next();
        }
    }
}