"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBaseConfig = exports.getDocusaurusAliases = exports.excludeJS = exports.clientDir = void 0;
const tslib_1 = require("tslib");
const fs_extra_1 = (0, tslib_1.__importDefault)(require("fs-extra"));
const mini_css_extract_plugin_1 = (0, tslib_1.__importDefault)(require("mini-css-extract-plugin"));
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const utils_1 = require("./utils");
const themes_1 = require("../server/themes");
const utils_2 = require("@docusaurus/utils");
const CSS_REGEX = /\.css$/;
const CSS_MODULE_REGEX = /\.module\.css$/;
exports.clientDir = path_1.default.join(__dirname, '..', 'client');
const LibrariesToTranspile = [
    'copy-text-to-clipboard', // contains optional catch binding, incompatible with recent versions of Edge
];
const LibrariesToTranspileRegex = new RegExp(LibrariesToTranspile.map((libName) => `(node_modules/${libName})`).join('|'));
function excludeJS(modulePath) {
    // always transpile client dir
    if (modulePath.startsWith(exports.clientDir)) {
        return false;
    }
    // Don't transpile node_modules except any docusaurus npm package
    return (/node_modules/.test(modulePath) &&
        !/(docusaurus)((?!node_modules).)*\.jsx?$/.test(modulePath) &&
        !LibrariesToTranspileRegex.test(modulePath));
}
exports.excludeJS = excludeJS;
function getDocusaurusAliases() {
    const dirPath = path_1.default.resolve(__dirname, '../client/exports');
    const extensions = ['.js', '.ts', '.tsx'];
    const aliases = {};
    fs_extra_1.default.readdirSync(dirPath)
        .filter((fileName) => extensions.includes(path_1.default.extname(fileName)))
        .forEach((fileName) => {
        const fileNameWithoutExtension = path_1.default.basename(fileName, path_1.default.extname(fileName));
        const aliasName = `@docusaurus/${fileNameWithoutExtension}`;
        aliases[aliasName] = path_1.default.resolve(dirPath, fileName);
    });
    return aliases;
}
exports.getDocusaurusAliases = getDocusaurusAliases;
function createBaseConfig(props, isServer, minify = true) {
    var _a;
    const { outDir, siteDir, siteConfig, siteConfigPath, baseUrl, generatedFilesDir, routesPaths, siteMetadata, plugins, } = props;
    const totalPages = routesPaths.length;
    const isProd = process.env.NODE_ENV === 'production';
    const minimizeEnabled = minify && isProd && !isServer;
    const useSimpleCssMinifier = process.env.USE_SIMPLE_CSS_MINIFIER === 'true';
    const fileLoaderUtils = (0, utils_2.getFileLoaderUtils)();
    const name = isServer ? 'server' : 'client';
    const mode = isProd ? 'production' : 'development';
    const themeAliases = (0, themes_1.loadPluginsThemeAliases)({ siteDir, plugins });
    return {
        mode,
        name,
        cache: {
            type: 'filesystem',
            // Can we share the same cache across locales?
            // Exploring that question at https://github.com/webpack/webpack/issues/13034
            // name: `${name}-${mode}`,
            name: `${name}-${mode}-${props.i18n.currentLocale}`,
            // When version string changes, cache is evicted
            version: [
                siteMetadata.docusaurusVersion,
                // Webpack does not evict the cache correctly on alias/swizzle change, so we force eviction.
                // See https://github.com/webpack/webpack/issues/13627
                (0, utils_2.md5Hash)(JSON.stringify(themeAliases)),
            ].join('-'),
            // When one of those modules/dependencies change (including transitive deps), cache is invalidated
            buildDependencies: {
                config: [
                    __filename,
                    path_1.default.join(__dirname, isServer ? 'server.js' : 'client.js'),
                    // Docusaurus config changes can affect MDX/JSX compilation, so we'd rather evict the cache.
                    // See https://github.com/questdb/questdb.io/issues/493
                    siteConfigPath,
                ],
            },
        },
        output: {
            pathinfo: false,
            path: outDir,
            filename: isProd ? 'assets/js/[name].[contenthash:8].js' : '[name].js',
            chunkFilename: isProd
                ? 'assets/js/[name].[contenthash:8].js'
                : '[name].js',
            publicPath: baseUrl,
            hashFunction: 'xxhash64',
        },
        // Don't throw warning when asset created is over 250kb
        performance: {
            hints: false,
        },
        devtool: isProd ? undefined : 'eval-cheap-module-source-map',
        resolve: {
            unsafeCache: false,
            extensions: ['.wasm', '.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
            symlinks: true,
            roots: [
                // Allow resolution of url("/fonts/xyz.ttf") by webpack
                // See https://webpack.js.org/configuration/resolve/#resolveroots
                // See https://github.com/webpack-contrib/css-loader/issues/1256
                ...siteConfig.staticDirectories.map((dir) => path_1.default.resolve(siteDir, dir)),
                siteDir,
                process.cwd(),
            ],
            alias: {
                '@site': siteDir,
                '@generated': generatedFilesDir,
                // Note: a @docusaurus alias would also catch @docusaurus/theme-common,
                // so we use fine-grained aliases instead
                // '@docusaurus': path.resolve(__dirname, '../client/exports'),
                ...getDocusaurusAliases(),
                ...themeAliases,
            },
            // This allows you to set a fallback for where Webpack should look for modules.
            // We want `@docusaurus/core` own dependencies/`node_modules` to "win" if there is conflict
            // Example: if there is core-js@3 in user's own node_modules, but core depends on
            // core-js@2, we should use core-js@2.
            modules: [
                path_1.default.resolve(__dirname, '..', '..', 'node_modules'),
                'node_modules',
                path_1.default.resolve(fs_extra_1.default.realpathSync(process.cwd()), 'node_modules'),
            ],
        },
        resolveLoader: {
            modules: ['node_modules', path_1.default.join(siteDir, 'node_modules')],
        },
        optimization: {
            removeAvailableModules: false,
            // Only minimize client bundle in production because server bundle is only used for static site generation
            minimize: minimizeEnabled,
            minimizer: minimizeEnabled
                ? (0, utils_1.getMinimizer)(useSimpleCssMinifier)
                : undefined,
            splitChunks: isServer
                ? false
                : {
                    // Since the chunk name includes all origin chunk names it's recommended for production builds with long term caching to NOT include [name] in the filenames
                    name: false,
                    cacheGroups: {
                        // disable the built-in cacheGroups
                        default: false,
                        common: {
                            name: 'common',
                            minChunks: totalPages > 2 ? totalPages * 0.5 : 2,
                            priority: 40,
                        },
                        // Only create one CSS file to avoid
                        // problems with code-split CSS loading in different orders
                        // causing inconsistent/non-deterministic styling
                        // See https://github.com/facebook/docusaurus/issues/2006
                        styles: {
                            name: 'styles',
                            type: 'css/mini-extract',
                            chunks: `all`,
                            enforce: true,
                            priority: 50,
                        },
                    },
                },
        },
        module: {
            rules: [
                fileLoaderUtils.rules.images(),
                fileLoaderUtils.rules.fonts(),
                fileLoaderUtils.rules.media(),
                fileLoaderUtils.rules.svg(),
                fileLoaderUtils.rules.otherAssets(),
                {
                    test: /\.(j|t)sx?$/,
                    exclude: excludeJS,
                    use: [
                        (0, utils_1.getCustomizableJSLoader)((_a = siteConfig.webpack) === null || _a === void 0 ? void 0 : _a.jsLoader)({
                            isServer,
                            babelOptions: (0, utils_1.getCustomBabelConfigFilePath)(siteDir),
                        }),
                    ],
                },
                {
                    test: CSS_REGEX,
                    exclude: CSS_MODULE_REGEX,
                    use: (0, utils_1.getStyleLoaders)(isServer, {
                        importLoaders: 1,
                        sourceMap: !isProd,
                    }),
                },
                // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
                // using the extension .module.css
                {
                    test: CSS_MODULE_REGEX,
                    use: (0, utils_1.getStyleLoaders)(isServer, {
                        modules: {
                            localIdentName: isProd
                                ? `[local]_[contenthash:base64:4]`
                                : `[local]_[path][name]`,
                            exportOnlyLocals: isServer,
                        },
                        importLoaders: 1,
                        sourceMap: !isProd,
                    }),
                },
            ],
        },
        plugins: [
            new mini_css_extract_plugin_1.default({
                filename: isProd
                    ? 'assets/css/[name].[contenthash:8].css'
                    : '[name].css',
                chunkFilename: isProd
                    ? 'assets/css/[name].[contenthash:8].css'
                    : '[name].css',
                // remove css order warnings if css imports are not sorted alphabetically
                // see https://github.com/webpack-contrib/mini-css-extract-plugin/pull/422 for more reasoning
                ignoreOrder: true,
            }),
        ],
    };
}
exports.createBaseConfig = createBaseConfig;
