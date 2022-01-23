"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMinimizer = exports.getHttpsConfig = exports.compile = exports.applyConfigurePostCss = exports.applyConfigureWebpack = exports.getCustomizableJSLoader = exports.getBabelOptions = exports.getCustomBabelConfigFilePath = exports.getStyleLoaders = void 0;
const tslib_1 = require("tslib");
const mini_css_extract_plugin_1 = (0, tslib_1.__importDefault)(require("mini-css-extract-plugin"));
const webpack_merge_1 = require("webpack-merge");
const webpack_1 = (0, tslib_1.__importDefault)(require("webpack"));
const fs_extra_1 = (0, tslib_1.__importDefault)(require("fs-extra"));
const terser_webpack_plugin_1 = (0, tslib_1.__importDefault)(require("terser-webpack-plugin"));
const css_minimizer_webpack_plugin_1 = (0, tslib_1.__importDefault)(require("css-minimizer-webpack-plugin"));
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const crypto_1 = (0, tslib_1.__importDefault)(require("crypto"));
const logger_1 = (0, tslib_1.__importDefault)(require("@docusaurus/logger"));
const utils_1 = require("@docusaurus/utils");
const lodash_1 = require("lodash");
// Utility method to get style loaders
function getStyleLoaders(isServer, cssOptions = {}) {
    if (isServer) {
        return cssOptions.modules
            ? [
                {
                    loader: require.resolve('css-loader'),
                    options: cssOptions,
                },
            ]
            : [
                {
                    loader: mini_css_extract_plugin_1.default.loader,
                    options: {
                        // Don't emit CSS files for SSR (previously used null-loader)
                        // See https://github.com/webpack-contrib/mini-css-extract-plugin/issues/90#issuecomment-811991738
                        emit: false,
                    },
                },
                {
                    loader: require.resolve('css-loader'),
                    options: cssOptions,
                },
            ];
    }
    return [
        {
            loader: mini_css_extract_plugin_1.default.loader,
            options: {
                esModule: true,
            },
        },
        {
            loader: require.resolve('css-loader'),
            options: cssOptions,
        },
        {
            // Options for PostCSS as we reference these options twice
            // Adds vendor prefixing based on your specified browser support in
            // package.json
            loader: require.resolve('postcss-loader'),
            options: {
                postcssOptions: {
                    // Necessary for external CSS imports to work
                    // https://github.com/facebook/create-react-app/issues/2677
                    ident: 'postcss',
                    plugins: [
                        // eslint-disable-next-line global-require
                        require('autoprefixer'),
                    ],
                },
            },
        },
    ];
}
exports.getStyleLoaders = getStyleLoaders;
function getCustomBabelConfigFilePath(siteDir) {
    const customBabelConfigurationPath = path_1.default.join(siteDir, utils_1.BABEL_CONFIG_FILE_NAME);
    return fs_extra_1.default.existsSync(customBabelConfigurationPath)
        ? customBabelConfigurationPath
        : undefined;
}
exports.getCustomBabelConfigFilePath = getCustomBabelConfigFilePath;
function getBabelOptions({ isServer, babelOptions, } = {}) {
    if (typeof babelOptions === 'string') {
        return {
            babelrc: false,
            configFile: babelOptions,
            caller: { name: isServer ? 'server' : 'client' },
        };
    }
    else {
        return Object.assign(babelOptions !== null && babelOptions !== void 0 ? babelOptions : { presets: [require.resolve('../babel/preset')] }, {
            babelrc: false,
            configFile: false,
            caller: { name: isServer ? 'server' : 'client' },
        });
    }
}
exports.getBabelOptions = getBabelOptions;
// Name is generic on purpose
// we want to support multiple js loader implementations (babel + esbuild)
function getDefaultBabelLoader({ isServer, babelOptions, }) {
    return {
        loader: require.resolve('babel-loader'),
        options: getBabelOptions({ isServer, babelOptions }),
    };
}
const getCustomizableJSLoader = (jsLoader = 'babel') => ({ isServer, babelOptions, }) => jsLoader === 'babel'
    ? getDefaultBabelLoader({ isServer, babelOptions })
    : jsLoader(isServer);
exports.getCustomizableJSLoader = getCustomizableJSLoader;
// TODO remove this before end of 2021?
const warnBabelLoaderOnce = (0, lodash_1.memoize)(() => {
    logger_1.default.warn `Docusaurus plans to support multiple JS loader strategies (Babel, esbuild...): code=${'getBabelLoader(isServer)'} is now deprecated in favor of code=${'getJSLoader(isServer)'}.`;
});
const getBabelLoaderDeprecated = function getBabelLoaderDeprecated(isServer, babelOptions) {
    warnBabelLoaderOnce();
    return getDefaultBabelLoader({ isServer, babelOptions });
};
// TODO remove this before end of 2021 ?
const warnCacheLoaderOnce = (0, lodash_1.memoize)(() => {
    logger_1.default.warn `Docusaurus uses Webpack 5 and code=${'getCacheLoader()'} usage is now deprecated.`;
});
function getCacheLoaderDeprecated() {
    warnCacheLoaderOnce();
    return null;
}
/**
 * Helper function to modify webpack config
 * @param configureWebpack a webpack config or a function to modify config
 * @param config initial webpack config
 * @param isServer indicates if this is a server webpack configuration
 * @param jsLoader custom js loader config
 * @param content content loaded by the plugin
 * @returns final/ modified webpack config
 */
function applyConfigureWebpack(configureWebpack, config, isServer, jsLoader, content) {
    // Export some utility functions
    const utils = {
        getStyleLoaders,
        getJSLoader: (0, exports.getCustomizableJSLoader)(jsLoader),
        getBabelLoader: getBabelLoaderDeprecated,
        getCacheLoader: getCacheLoaderDeprecated,
    };
    if (typeof configureWebpack === 'function') {
        const { mergeStrategy, ...res } = configureWebpack(config, isServer, utils, content);
        if (res && typeof res === 'object') {
            const customizeRules = mergeStrategy !== null && mergeStrategy !== void 0 ? mergeStrategy : {};
            return (0, webpack_merge_1.mergeWithCustomize)({
                customizeArray: (0, webpack_merge_1.customizeArray)(customizeRules),
                customizeObject: (0, webpack_merge_1.customizeObject)(customizeRules),
            })(config, res);
        }
    }
    return config;
}
exports.applyConfigureWebpack = applyConfigureWebpack;
function applyConfigurePostCss(configurePostCss, config) {
    var _a, _b;
    // TODO not ideal heuristic but good enough for our usecase?
    function isPostCssLoader(loader) {
        var _a, _b;
        return !!((_b = (_a = loader) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.postcssOptions);
    }
    // Does not handle all edge cases, but good enough for now
    function overridePostCssOptions(entry) {
        if (isPostCssLoader(entry)) {
            entry.options.postcssOptions = configurePostCss(entry.options.postcssOptions);
        }
        else if (Array.isArray(entry.oneOf)) {
            entry.oneOf.forEach(overridePostCssOptions);
        }
        else if (Array.isArray(entry.use)) {
            entry.use
                .filter((u) => typeof u === 'object')
                .forEach((rule) => overridePostCssOptions(rule));
        }
    }
    (_b = (_a = config.module) === null || _a === void 0 ? void 0 : _a.rules) === null || _b === void 0 ? void 0 : _b.forEach((rule) => overridePostCssOptions(rule));
    return config;
}
exports.applyConfigurePostCss = applyConfigurePostCss;
function compile(config) {
    return new Promise((resolve, reject) => {
        const compiler = (0, webpack_1.default)(config);
        compiler.run((err, stats) => {
            var _a;
            if (err) {
                logger_1.default.error(err.stack || err);
                // @ts-expect-error: see https://webpack.js.org/api/node/#error-handling
                if (err.details) {
                    // @ts-expect-error: see https://webpack.js.org/api/node/#error-handling
                    logger_1.default.error(err.details);
                }
                reject(err);
            }
            // let plugins consume all the stats
            const errorsWarnings = stats === null || stats === void 0 ? void 0 : stats.toJson('errors-warnings');
            if (stats === null || stats === void 0 ? void 0 : stats.hasErrors()) {
                reject(new Error('Failed to compile with errors.'));
            }
            if (errorsWarnings && (stats === null || stats === void 0 ? void 0 : stats.hasWarnings())) {
                (_a = errorsWarnings.warnings) === null || _a === void 0 ? void 0 : _a.forEach((warning) => {
                    logger_1.default.warn(`${warning}`);
                });
            }
            // Webpack 5 requires calling close() so that persistent caching works
            // See https://github.com/webpack/webpack.js.org/pull/4775
            compiler.close((errClose) => {
                if (errClose) {
                    logger_1.default.error(`Error while closing Webpack compiler: ${errClose}`);
                    reject(errClose);
                }
                else {
                    resolve();
                }
            });
        });
    });
}
exports.compile = compile;
// Ensure the certificate and key provided are valid and if not
// throw an easy to debug error
function validateKeyAndCerts({ cert, key, keyFile, crtFile, }) {
    let encrypted;
    try {
        // publicEncrypt will throw an error with an invalid cert
        encrypted = crypto_1.default.publicEncrypt(cert, Buffer.from('test'));
    }
    catch (err) {
        throw new Error(`The certificate ${crtFile} is invalid.
${err}`);
    }
    try {
        // privateDecrypt will throw an error with an invalid key
        crypto_1.default.privateDecrypt(key, encrypted);
    }
    catch (err) {
        throw new Error(`The certificate key ${keyFile} is invalid.
${err}`);
    }
}
// Read file and throw an error if it doesn't exist
function readEnvFile(file, type) {
    if (!fs_extra_1.default.existsSync(file)) {
        throw new Error(`You specified ${type} in your env, but the file "${file}" can't be found.`);
    }
    return fs_extra_1.default.readFileSync(file);
}
const appDirectory = fs_extra_1.default.realpathSync(process.cwd());
// Get the https config
// Return cert files if provided in env, otherwise just true or false
function getHttpsConfig() {
    const { SSL_CRT_FILE, SSL_KEY_FILE, HTTPS } = process.env;
    const isHttps = HTTPS === 'true';
    if (isHttps && SSL_CRT_FILE && SSL_KEY_FILE) {
        const crtFile = path_1.default.resolve(appDirectory, SSL_CRT_FILE);
        const keyFile = path_1.default.resolve(appDirectory, SSL_KEY_FILE);
        const config = {
            cert: readEnvFile(crtFile, 'SSL_CRT_FILE'),
            key: readEnvFile(keyFile, 'SSL_KEY_FILE'),
        };
        validateKeyAndCerts({ ...config, keyFile, crtFile });
        return config;
    }
    return isHttps;
}
exports.getHttpsConfig = getHttpsConfig;
// See https://github.com/webpack-contrib/terser-webpack-plugin#parallel
function getTerserParallel() {
    let terserParallel = true;
    if (process.env.TERSER_PARALLEL === 'false') {
        terserParallel = false;
    }
    else if (process.env.TERSER_PARALLEL &&
        parseInt(process.env.TERSER_PARALLEL, 10) > 0) {
        terserParallel = parseInt(process.env.TERSER_PARALLEL, 10);
    }
    return terserParallel;
}
function getMinimizer(useSimpleCssMinifier = false) {
    const minimizer = [
        new terser_webpack_plugin_1.default({
            parallel: getTerserParallel(),
            terserOptions: {
                parse: {
                    // we want uglify-js to parse ecma 8 code. However, we don't want it
                    // to apply any minification steps that turns valid ecma 5 code
                    // into invalid ecma 5 code. This is why the 'compress' and 'output'
                    // sections only apply transformations that are ecma 5 safe
                    // https://github.com/facebook/create-react-app/pull/4234
                    ecma: 2020,
                },
                compress: {
                    ecma: 5,
                    // @ts-expect-error: API change in new version?
                    warnings: false,
                },
                mangle: {
                    safari10: true,
                },
                output: {
                    ecma: 5,
                    comments: false,
                    // Turned on because emoji and regex is not minified properly using default
                    // https://github.com/facebook/create-react-app/issues/2488
                    ascii_only: true,
                },
            },
        }),
    ];
    if (useSimpleCssMinifier) {
        minimizer.push(new css_minimizer_webpack_plugin_1.default());
    }
    else {
        minimizer.push(
        // Using the array syntax to add 2 minimizers
        // see https://github.com/webpack-contrib/css-minimizer-webpack-plugin#array
        new css_minimizer_webpack_plugin_1.default({
            minimizerOptions: [
                // CssNano options
                {
                    preset: require.resolve('@docusaurus/cssnano-preset'),
                },
                // CleanCss options
                {
                    // @ts-expect-error: API change in new version?
                    inline: false,
                    level: {
                        1: {
                            all: false,
                            removeWhitespace: true,
                        },
                        2: {
                            all: true,
                            restructureRules: true,
                            removeUnusedAtRules: false,
                        },
                    },
                },
            ],
            minify: [
                css_minimizer_webpack_plugin_1.default.cssnanoMinify,
                css_minimizer_webpack_plugin_1.default.cleanCssMinify,
            ],
        }));
    }
    return minimizer;
}
exports.getMinimizer = getMinimizer;
