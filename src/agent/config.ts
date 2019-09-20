/**
 * @author WMXPY
 * @namespace Brontosaurus_Library_Agent
 * @description Config
 */

import * as Fs from "fs";
import * as Path from "path";
import { Article, Category, LibraryConfig } from "../declare";
import { getConfigPath, getDefaultNavigationTemplate, getDefaultPublicArticleTemplate } from "../util/conf";
import { ERROR_CODE, panic } from "../util/panic";

export class ConfigAgent {

    public static get instance(): ConfigAgent {

        return this._instance;
    }

    private static readonly _instance: ConfigAgent = new ConfigAgent();

    private readonly _configPath: string;
    private readonly _config: LibraryConfig;

    private constructor() {

        this._configPath = Path.resolve(getConfigPath());
        this._config = this._getConfig(this._configPath);
    }

    public get title(): string {

        return this._config.title;
    }

    public get basePath(): string {

        if (Path.isAbsolute(this._config.basePath)) {
            return this._config.basePath;
        }

        return Path.join(this._configPath, '..', this._config.basePath);
    }

    public get categories(): Category[] {

        return this._config.categories;
    }

    public get articles(): Article[] {

        return this._config.articles;
    }

    public joinPath(url: string): string {

        return Path.join(this.basePath, url);
    }

    public getPublicArticleTemplate(): string {

        if (this._config.globalTemplates) {
            if (this._config.globalTemplates.publicArticle) {
                return this.joinPath(this._config.globalTemplates.publicArticle);
            }
        }

        return getDefaultPublicArticleTemplate();
    }

    public getNavigationTemplate(): string {

        if (this._config.globalTemplates) {
            if (this._config.globalTemplates.navigation) {
                return this.joinPath(this._config.globalTemplates.navigation);
            }
        }

        return getDefaultNavigationTemplate();
    }

    private _getConfig(path: string): LibraryConfig {

        if (!Fs.existsSync(path)) {
            throw panic.code(ERROR_CODE.CONFIG_PATH_NOT_EXIST, path);
        }

        const config: string = Fs.readFileSync(path, 'utf8');
        const parsed: LibraryConfig = JSON.parse(config);

        return parsed;
    }
}
