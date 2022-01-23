"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const utils_1 = require("@docusaurus/utils");
const logger_1 = (0, tslib_1.__importDefault)(require("@docusaurus/logger"));
const chokidar_1 = (0, tslib_1.__importDefault)(require("chokidar"));
const html_webpack_plugin_1 = (0, tslib_1.__importDefault)(require("html-webpack-plugin"));
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const lodash_1 = require("lodash");
const openBrowser_1 = (0, tslib_1.__importDefault)(require("react-dev-utils/openBrowser"));
const WebpackDevServerUtils_1 = require("react-dev-utils/WebpackDevServerUtils");
const evalSourceMapMiddleware_1 = (0, tslib_1.__importDefault)(require("react-dev-utils/evalSourceMapMiddleware"));
const webpack_1 = (0, tslib_1.__importDefault)(require("webpack"));
const webpack_dev_server_1 = (0, tslib_1.__importDefault)(require("webpack-dev-server"));
const webpack_merge_1 = (0, tslib_1.__importDefault)(require("webpack-merge"));
const server_1 = require("../server");
const client_1 = (0, tslib_1.__importDefault)(require("../webpack/client"));
const utils_2 = require("../webpack/utils");
const commandUtils_1 = require("./commandUtils");
const translations_1 = require("../server/translations/translations");
async function start(siteDir, cliOptions) {
    process.env.NODE_ENV = 'development';
    process.env.BABEL_ENV = 'development';
    logger_1.default.info('Starting the development server...');
    function loadSite() {
        return (0, server_1.load)(siteDir, {
            customConfigFilePath: cliOptions.config,
            locale: cliOptions.locale,
            localizePath: undefined, // should this be configurable?
        });
    }
    // Process all related files as a prop.
    const props = await loadSite();
    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
    const host = (0, commandUtils_1.getCLIOptionHost)(cliOptions.host);
    const port = await (0, commandUtils_1.getCLIOptionPort)(cliOptions.port, host);
    if (port === null) {
        process.exit();
    }
    const { baseUrl, headTags, preBodyTags, postBodyTags } = props;
    const urls = (0, WebpackDevServerUtils_1.prepareUrls)(protocol, host, port);
    const openUrl = (0, utils_1.normalizeUrl)([urls.localUrlForBrowser, baseUrl]);
    logger_1.default.success `Docusaurus website is running at path=${openUrl}.`;
    // Reload files processing.
    const reload = (0, lodash_1.debounce)(() => {
        loadSite()
            .then(({ baseUrl: newBaseUrl }) => {
            const newOpenUrl = (0, utils_1.normalizeUrl)([urls.localUrlForBrowser, newBaseUrl]);
            if (newOpenUrl !== openUrl) {
                logger_1.default.success `Docusaurus website is running at path=${newOpenUrl}.`;
            }
        })
            .catch((err) => {
            logger_1.default.error(err.stack);
        });
    }, 500);
    const { siteConfig, plugins = [] } = props;
    const normalizeToSiteDir = (filepath) => {
        if (filepath && path_1.default.isAbsolute(filepath)) {
            return (0, utils_1.posixPath)(path_1.default.relative(siteDir, filepath));
        }
        return (0, utils_1.posixPath)(filepath);
    };
    const pluginPaths = []
        .concat(...plugins
        .map((plugin) => { var _a, _b; return (_b = (_a = plugin.getPathsToWatch) === null || _a === void 0 ? void 0 : _a.call(plugin)) !== null && _b !== void 0 ? _b : []; })
        .filter(Boolean))
        .map(normalizeToSiteDir);
    const pathsToWatch = [
        ...pluginPaths,
        props.siteConfigPath,
        (0, translations_1.getTranslationsLocaleDirPath)({
            siteDir,
            locale: props.i18n.currentLocale,
        }),
    ];
    const pollingOptions = {
        usePolling: !!cliOptions.poll,
        interval: Number.isInteger(cliOptions.poll)
            ? cliOptions.poll
            : undefined,
    };
    const httpsConfig = (0, utils_2.getHttpsConfig)();
    const fsWatcher = chokidar_1.default.watch(pathsToWatch, {
        cwd: siteDir,
        ignoreInitial: true,
        ...{ pollingOptions },
    });
    ['add', 'change', 'unlink', 'addDir', 'unlinkDir'].forEach((event) => fsWatcher.on(event, reload));
    let config = (0, webpack_merge_1.default)((0, client_1.default)(props), {
        infrastructureLogging: {
            // Reduce log verbosity, see https://github.com/facebook/docusaurus/pull/5420#issuecomment-906613105
            level: 'warn',
        },
        plugins: [
            // Generates an `index.html` file with the <script> injected.
            new html_webpack_plugin_1.default({
                template: path_1.default.resolve(__dirname, '../client/templates/index.html.template.ejs'),
                // So we can define the position where the scripts are injected.
                inject: false,
                filename: 'index.html',
                title: siteConfig.title,
                headTags,
                preBodyTags,
                postBodyTags,
            }),
        ],
    });
    // Plugin Lifecycle - configureWebpack and configurePostCss.
    plugins.forEach((plugin) => {
        var _a;
        const { configureWebpack, configurePostCss } = plugin;
        if (configurePostCss) {
            config = (0, utils_2.applyConfigurePostCss)(configurePostCss, config);
        }
        if (configureWebpack) {
            config = (0, utils_2.applyConfigureWebpack)(configureWebpack.bind(plugin), // The plugin lifecycle may reference `this`. // TODO remove this implicit api: inject in callback instead
            config, false, (_a = props.siteConfig.webpack) === null || _a === void 0 ? void 0 : _a.jsLoader, plugin.content);
        }
    });
    const compiler = (0, webpack_1.default)(config);
    if (process.env.E2E_TEST) {
        compiler.hooks.done.tap('done', (stats) => {
            if (stats.hasErrors()) {
                logger_1.default.error('E2E_TEST: Project has compiler errors.');
                process.exit(1);
            }
            logger_1.default.success('E2E_TEST: Project can compile.');
            process.exit(0);
        });
    }
    // https://webpack.js.org/configuration/dev-server
    const defaultDevServerConfig = {
        hot: cliOptions.hotOnly ? 'only' : true,
        liveReload: false,
        client: {
            progress: true,
            overlay: {
                warnings: false,
                errors: true,
            },
        },
        headers: {
            'access-control-allow-origin': '*',
        },
        devMiddleware: {
            publicPath: baseUrl,
            // Reduce log verbosity, see https://github.com/facebook/docusaurus/pull/5420#issuecomment-906613105
            stats: 'summary',
        },
        static: siteConfig.staticDirectories.map((dir) => ({
            publicPath: baseUrl,
            directory: path_1.default.resolve(siteDir, dir),
            watch: {
                // Useful options for our own monorepo using symlinks!
                // See https://github.com/webpack/webpack/issues/11612#issuecomment-879259806
                followSymlinks: true,
                ignored: /node_modules\/(?!@docusaurus)/,
                ...{ pollingOptions },
            },
        })),
        ...(httpsConfig && {
            server: typeof httpsConfig === 'object'
                ? {
                    type: 'https',
                    options: httpsConfig,
                }
                : 'https',
        }),
        historyApiFallback: {
            rewrites: [{ from: /\/*/, to: baseUrl }],
        },
        allowedHosts: 'all',
        host,
        port,
        onBeforeSetupMiddleware: (devServer) => {
            // This lets us fetch source contents from webpack for the error overlay.
            devServer.app.use((0, evalSourceMapMiddleware_1.default)(
            // @ts-expect-error: bad types
            devServer));
        },
    };
    // Allow plugin authors to customize/override devServer config
    const devServerConfig = (0, webpack_merge_1.default)([defaultDevServerConfig, config.devServer].filter(Boolean));
    const devServer = new webpack_dev_server_1.default(devServerConfig, compiler);
    devServer.startCallback(() => {
        if (cliOptions.open) {
            (0, openBrowser_1.default)(openUrl);
        }
    });
    ['SIGINT', 'SIGTERM'].forEach((sig) => {
        process.on(sig, () => {
            devServer.stop();
            process.exit();
        });
    });
}
exports.default = start;
