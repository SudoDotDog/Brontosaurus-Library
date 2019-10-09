/**
 * @author WMXPY
 * @namespace Brontosaurus_Library_Routes
 * @description Import
 */

import { ArticleRoute } from "../routes/article";
import { FaviconRoute } from "../routes/favicon";
import { RobotRoute } from "../routes/robot";

export const LibraryRoutes = [

    new FaviconRoute(),
    new RobotRoute(),
    new ArticleRoute(),
];
