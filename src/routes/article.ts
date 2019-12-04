/**
 * @author WMXPY
 * @namespace Brontosaurus_Library_Routes
 * @description Article
 */

import { AuthToken } from "@brontosaurus/node";
import { ROUTE_MODE, SudooExpressHandler, SudooExpressNextFunction, SudooExpressRequest, SudooExpressResponse } from "@sudoo/express";
import { HTTP_RESPONSE_CODE } from "@sudoo/magic";
import { ArticleAgent } from "../agent/article";
import { BrontosaurusRoute } from "../basic/basic";
import { autoHook } from "../basic/hook";
import { Article } from "../declare";
import { createRenderArticleBuilder, createRenderIndexBuilder, renderFourOFour } from "../service/article";
import { auth, buildAuthPath, buildBufferPath, verifyToken } from "../service/auth";
import { PageRenderBuilder } from "../service/render";
import { ERROR_CODE, panic } from "../util/panic";

export class ArticleRoute extends BrontosaurusRoute {

    public readonly path: any = /^[A-Za-z0-9_\-\/]+$/;
    public readonly mode: ROUTE_MODE = ROUTE_MODE.GET;

    public readonly groups: SudooExpressHandler[] = [
        autoHook.wrap(this._articleHandler.bind(this), 'Article'),
    ];

    private readonly _article: ArticleAgent = ArticleAgent.instance;

    private async _articleHandler(req: SudooExpressRequest, res: SudooExpressResponse, next: SudooExpressNextFunction): Promise<void> {

        try {

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

            const authorization: AuthToken | null = this._getToken(req.cookies.token);

            if (req.path === '/') {

                const indexPage: PageRenderBuilder | null = await createRenderIndexBuilder();

                if (!indexPage) {
                    throw panic.code(ERROR_CODE.FILE_NOT_FOUND);
                }

                indexPage.attemptHydrateToken(authorization);

                const indexRaw: string = indexPage.render();
                res.agent.raw(indexRaw);
                return;
            }

            const stack: string[] = req.path.split('/').filter(Boolean);
            const article: Article | null = this._article.getArticle(stack);

            if (!article) {
                const fourOFour: string = await this._renderFourOFour(buildAuthPath(req.path), Boolean(authorization));
                res.agent.raw(fourOFour);
                return;
            }

            if (article.groups) {

                if (!authorization) {
                    const fourOFour: string = await this._renderFourOFour(buildAuthPath(req.path), Boolean(authorization));
                    res.agent.raw(fourOFour);
                    return;
                }

                const result: boolean = verifyToken(authorization, article.groups, article.groupMode || 'All');

                if (!result) {
                    const fourOFour: string = await this._renderFourOFour(buildAuthPath(req.path), Boolean(authorization));
                    res.agent.raw(fourOFour);
                    return;
                }
            }

            const page: PageRenderBuilder | null = await createRenderArticleBuilder(article);

            if (!page) {
                throw panic.code(ERROR_CODE.FILE_NOT_FOUND, stack.join('/'));
            }

            page.attemptHydrateToken(authorization);

            const raw: string = page.render();

            res.agent.raw(raw);
        } catch (error) {

            this._log.error(`${req.path} - ${error.message} (${error.code})`);
            res.agent.fail(HTTP_RESPONSE_CODE.NOT_FOUND, panic.code(ERROR_CODE.NOT_FOUND));
        } finally {
            next();
        }
    }

    private async _renderFourOFour(authPath: string, loggedIn: boolean): Promise<string> {

        console.log(loggedIn);

        const fourOFour: string | null = await renderFourOFour(authPath, loggedIn);

        if (!fourOFour) {
            throw panic.code(ERROR_CODE.FILE_NOT_FOUND, '404');
        }

        return fourOFour;
    }

    private _getToken(principle: string | undefined): AuthToken | null {

        if (!principle) {
            return null;
        }

        const token: AuthToken | null = auth.token(principle);

        if (!token) {
            throw panic.code(ERROR_CODE.INVALID_TOKEN);
        }

        return token;
    }
}
