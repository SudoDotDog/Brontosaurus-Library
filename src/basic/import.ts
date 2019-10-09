/**
 * @author WMXPY
 * @namespace Brontosaurus_Library_Routes
 * @description Import
 */

import { ArticleRoute } from "../routes/article";
import { RobotRoute } from "../routes/robot";

export const LibraryRoutes = [

    new RobotRoute(),
    new ArticleRoute(),
];
