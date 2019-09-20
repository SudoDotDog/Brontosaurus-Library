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
import { renderArticle, renderFourOFour } from "../service/article";
import { buildAuthPath, buildBufferPath, verifyToken } from "../service/auth";
import { ERROR_CODE, panic } from "../util/panic";

export class ArticleRoute extends BrontosaurusRoute {

    public readonly path: string = '*';
    public readonly mode: ROUTE_MODE = ROUTE_MODE.GET;

    public readonly groups: SudooExpressHandler[] = [
        autoHook.wrap(this._articleHandler.bind(this), 'Article', true),
    ];

    private readonly _article: ArticleAgent = ArticleAgent.instance;
    private readonly _config: ConfigAgent = ConfigAgent.instance;

    private async _articleHandler(req: SudooExpressRequest, res: SudooExpressResponse, next: SudooExpressNextFunction): Promise<void> {

        try {

            const stack: string[] = req.path.split('/').filter(Boolean);
            const article: Article | null = this._article.getArticle(stack);

            if (!article) {
                throw panic.code(ERROR_CODE.ARTICLE_NOT_FOUND, stack.join('/'));
            }

            const logout: string | undefined = req.query.logout;

            if (logout) {
                res.cookie('token', '');
                res.agent.redirect(buildBufferPath(req.path));
                return;
            }

            const token: string | undefined = req.query.token;

            if (token) {
                res.cookie('token', token);
                res.agent.redirect(buildBufferPath(req.path));
                return;
            }

            if (article.groups) {

                const cookie: string | undefined = req.cookies.token;

                if (!cookie) {
                    const fourOFour: string = await this._renderFourOFour();
                    res.agent.raw(fourOFour);
                    // res.agent.redirect(buildAuthPath(req.path));
                    return;
                }

                const result: boolean = verifyToken(cookie as any, article.groups, article.groupMode || 'All');

                if (!result) {
                    const fourOFour: string = await this._renderFourOFour();
                    res.agent.raw(fourOFour);
                    // res.agent.redirect(buildAuthPath(req.path));
                    return;
                }
            }

            const html: string | null = await renderArticle(article);

            if (!html) {
                throw panic.code(ERROR_CODE.FILE_NOT_FOUND, stack.join('/'));
            }

            res.agent.raw(html);
        } catch (error) {

            this._log.error(`${req.path} - ${error.message} (${error.code})`);
            res.agent.fail(404, panic.code(ERROR_CODE.NOT_FOUND));
        } finally {
            next();
        }
    }

    private async _renderFourOFour(): Promise<string> {

        const fourOFour: string | null = await renderFourOFour();

        if (!fourOFour) {
            throw panic.code(ERROR_CODE.FILE_NOT_FOUND, '404');
        }

        return fourOFour;
    }
}
