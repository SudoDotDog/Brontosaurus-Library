/**
 * @author WMXPY
 * @namespace Brontosaurus_Library_Agent
 * @description Config
 */

import * as Fs from "fs";
import * as Path from "path";
import { getConfigPath } from "../util/conf";
import { ERROR_CODE, panic } from "../util/panic";
import { Article } from "./article";

export type LibraryConfig = {

    readonly baseUrl: string;
    readonly articles: Article[];
};

export class ConfigAgent {

    public static get instance(): ConfigAgent {

        return this._instance;
    }

    private static readonly _instance: ConfigAgent = new ConfigAgent();

    private readonly _config: LibraryConfig;

    private constructor() {

        this._config = this._getConfig();
    }

    public get config(): LibraryConfig {

        return this._config;
    }

    private _getConfig(): LibraryConfig {

        const path: string = Path.resolve(getConfigPath());

        if (!Fs.existsSync(path)) {
            throw panic.code(ERROR_CODE.CONFIG_PATH_NOT_EXIST, path);
        }

        const config: string = Fs.readFileSync(path, 'utf8');
        const parsed: LibraryConfig = JSON.parse(config);

        return parsed;
    }
}
