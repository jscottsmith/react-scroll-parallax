"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const logger_1 = (0, tslib_1.__importDefault)(require("@docusaurus/logger"));
const copy_webpack_plugin_1 = (0, tslib_1.__importDefault)(require("copy-webpack-plugin"));
const fs_extra_1 = (0, tslib_1.__importDefault)(require("fs-extra"));
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const react_loadable_ssr_addon_v5_slorber_1 = (0, tslib_1.__importDefault)(require("react-loadable-ssr-addon-v5-slorber"));
const webpack_bundle_analyzer_1 = require("webpack-bundle-analyzer");
const webpack_merge_1 = (0, tslib_1.__importDefault)(require("webpack-merge"));
const server_1 = require("../server");
const brokenLinks_1 = require("../server/brokenLinks");
const client_1 = (0, tslib_1.__importDefault)(require("../webpack/client"));
const server_2 = (0, tslib_1.__importDefault)(require("../webpack/server"));
const utils_1 = require("../webpack/utils");
const CleanWebpackPlugin_1 = (0, tslib_1.__importDefault)(require("../webpack/plugins/CleanWebpackPlugin"));
const i18n_1 = require("../server/i18n");
const utils_2 = require("@docusaurus/utils");
async function build(siteDir, cliOptions = {}, 
// TODO what's the purpose of this arg ?
forceTerminate = true) {
    ['SIGINT', 'SIGTERM'].forEach((sig) => {
        process.on(sig, () => process.exit());
    });
    async function tryToBuildLocale({ locale, isLastLocale, }) {
        try {
            return await buildLocale({
                siteDir,
                locale,
                cliOptions,
                forceTerminate,
                isLastLocale,
            });
        }
        catch (e) {
            logger_1.default.error `Unable to build website for locale name=${locale}.`;
            throw e;
        }
    }
    const context = await (0, server_1.loadContext)(siteDir, {
        customOutDir: cliOptions.outDir,
        customConfigFilePath: cliOptions.config,
        locale: cliOptions.locale,
        localizePath: cliOptions.locale ? false : undefined,
    });
    const i18n = await (0, i18n_1.loadI18n)(context.siteConfig, {
        locale: cliOptions.locale,
    });
    if (cliOptions.locale) {
        return tryToBuildLocale({ locale: cliOptions.locale, isLastLocale: true });
    }
    else {
        if (i18n.locales.length > 1) {
            logger_1.default.info `Website will be built for all these locales: ${i18n.locales}`;
        }
        // We need the default locale to always be the 1st in the list
        // If we build it last, it would "erase" the localized sites built in subfolders
        const orderedLocales = [
            i18n.defaultLocale,
            ...i18n.locales.filter((locale) => locale !== i18n.defaultLocale),
        ];
        const results = await (0, utils_2.mapAsyncSequencial)(orderedLocales, (locale) => {
            const isLastLocale = orderedLocales.indexOf(locale) === orderedLocales.length - 1;
            return tryToBuildLocale({ locale, isLastLocale });
        });
        return results[0];
    }
}
exports.default = build;
async function buildLocale({ siteDir, locale, cliOptions, forceTerminate, isLastLocale, }) {
    process.env.BABEL_ENV = 'production';
    process.env.NODE_ENV = 'production';
    logger_1.default.info `name=${`[${locale}]`} Creating an optimized production build...`;
    const props = await (0, server_1.load)(siteDir, {
        customOutDir: cliOptions.outDir,
        customConfigFilePath: cliOptions.config,
        locale,
        localizePath: cliOptions.locale ? false : undefined,
    });
    // Apply user webpack config.
    const { outDir, generatedFilesDir, plugins, siteConfig: { baseUrl, onBrokenLinks, staticDirectories }, routes, } = props;
    const clientManifestPath = path_1.default.join(generatedFilesDir, 'client-manifest.json');
    let clientConfig = (0, webpack_merge_1.default)((0, client_1.default)(props, cliOptions.minify), {
        plugins: [
            // Remove/clean build folders before building bundles.
            new CleanWebpackPlugin_1.default({ verbose: false }),
            // Visualize size of webpack output files with an interactive zoomable treemap.
            cliOptions.bundleAnalyzer && new webpack_bundle_analyzer_1.BundleAnalyzerPlugin(),
            // Generate client manifests file that will be used for server bundle.
            new react_loadable_ssr_addon_v5_slorber_1.default({
                filename: clientManifestPath,
            }),
        ].filter(Boolean),
    });
    const allCollectedLinks = {};
    let serverConfig = (0, server_2.default)({
        props,
        onLinksCollected: (staticPagePath, links) => {
            allCollectedLinks[staticPagePath] = links;
        },
    });
    serverConfig = (0, webpack_merge_1.default)(serverConfig, {
        plugins: [
            new copy_webpack_plugin_1.default({
                patterns: staticDirectories
                    .map((dir) => path_1.default.resolve(siteDir, dir))
                    .filter(fs_extra_1.default.existsSync)
                    .map((dir) => ({ from: dir, to: outDir })),
            }),
        ],
    });
    // Plugin Lifecycle - configureWebpack and configurePostCss.
    plugins.forEach((plugin) => {
        var _a, _b;
        const { configureWebpack, configurePostCss } = plugin;
        if (configurePostCss) {
            clientConfig = (0, utils_1.applyConfigurePostCss)(configurePostCss, clientConfig);
        }
        if (configureWebpack) {
            clientConfig = (0, utils_1.applyConfigureWebpack)(configureWebpack.bind(plugin), // The plugin lifecycle may reference `this`. // TODO remove this implicit api: inject in callback instead
            clientConfig, false, (_a = props.siteConfig.webpack) === null || _a === void 0 ? void 0 : _a.jsLoader, plugin.content);
            serverConfig = (0, utils_1.applyConfigureWebpack)(configureWebpack.bind(plugin), // The plugin lifecycle may reference `this`. // TODO remove this implicit api: inject in callback instead
            serverConfig, true, (_b = props.siteConfig.webpack) === null || _b === void 0 ? void 0 : _b.jsLoader, plugin.content);
        }
    });
    // Make sure generated client-manifest is cleaned first so we don't reuse
    // the one from previous builds.
    if (await fs_extra_1.default.pathExists(clientManifestPath)) {
        await fs_extra_1.default.unlink(clientManifestPath);
    }
    // Run webpack to build JS bundle (client) and static html files (server).
    await (0, utils_1.compile)([clientConfig, serverConfig]);
    // Remove server.bundle.js because it is not needed.
    if (serverConfig.output &&
        serverConfig.output.filename &&
        typeof serverConfig.output.filename === 'string') {
        const serverBundle = path_1.default.join(outDir, serverConfig.output.filename);
        if (await fs_extra_1.default.pathExists(serverBundle)) {
            await fs_extra_1.default.unlink(serverBundle);
        }
    }
    // Plugin Lifecycle - postBuild.
    await Promise.all(plugins.map(async (plugin) => {
        if (!plugin.postBuild) {
            return;
        }
        await plugin.postBuild(props);
    }));
    await (0, brokenLinks_1.handleBrokenLinks)({
        allCollectedLinks,
        routes,
        onBrokenLinks,
        outDir,
        baseUrl,
    });
    logger_1.default.success `Generated static files in path=${path_1.default.relative(process.cwd(), outDir)}.`;
    if (isLastLocale) {
        logger_1.default.info `Use code=${'npm run serve'} command to test your build locally.`;
    }
    if (forceTerminate && isLastLocale && !cliOptions.bundleAnalyzer) {
        process.exit(0);
    }
    return outDir;
}
