"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileLoaderUtils = void 0;
const tslib_1 = require("tslib");
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const posixPath_1 = require("./posixPath");
const constants_1 = require("./constants");
// Inspired by https://github.com/gatsbyjs/gatsby/blob/8e6e021014da310b9cc7d02e58c9b3efe938c665/packages/gatsby/src/utils/webpack-utils.ts#L447
function getFileLoaderUtils() {
    // files/images < urlLoaderLimit will be inlined as base64 strings directly in the html
    const urlLoaderLimit = constants_1.WEBPACK_URL_LOADER_LIMIT;
    // defines the path/pattern of the assets handled by webpack
    const fileLoaderFileName = (folder) => `${constants_1.OUTPUT_STATIC_ASSETS_DIR_NAME}/${folder}/[name]-[hash].[ext]`;
    const loaders = {
        file: (options) => ({
            loader: require.resolve(`file-loader`),
            options: {
                name: fileLoaderFileName(options.folder),
            },
        }),
        url: (options) => ({
            loader: require.resolve('url-loader'),
            options: {
                limit: urlLoaderLimit,
                name: fileLoaderFileName(options.folder),
                fallback: require.resolve('file-loader'),
            },
        }),
        // TODO find a better solution to avoid conflicts with the ideal-image plugin
        // TODO this may require a little breaking change for ideal-image users?
        // Maybe with the ideal image plugin, all md images should be "ideal"?
        // This is used to force url-loader+file-loader on markdown images
        // https://webpack.js.org/concepts/loaders/#inline
        inlineMarkdownImageFileLoader: `!${(0, posixPath_1.posixPath)(require.resolve('url-loader'))}?limit=${urlLoaderLimit}&name=${fileLoaderFileName('images')}&fallback=${(0, posixPath_1.posixPath)(require.resolve('file-loader'))}!`,
        inlineMarkdownLinkFileLoader: `!${(0, posixPath_1.posixPath)(require.resolve('file-loader'))}?name=${fileLoaderFileName('files')}!`,
    };
    const rules = {
        /**
         * Loads image assets, inlines images via a data URI if they are below
         * the size threshold
         */
        images: () => ({
            use: [loaders.url({ folder: 'images' })],
            test: /\.(ico|jpg|jpeg|png|gif|webp)(\?.*)?$/,
        }),
        fonts: () => ({
            use: [loaders.url({ folder: 'fonts' })],
            test: /\.(woff|woff2|eot|ttf|otf)$/,
        }),
        /**
         * Loads audio and video and inlines them via a data URI if they are below
         * the size threshold
         */
        media: () => ({
            use: [loaders.url({ folder: 'medias' })],
            test: /\.(mp4|webm|ogv|wav|mp3|m4a|aac|oga|flac)$/,
        }),
        svg: () => ({
            test: /\.svg?$/,
            oneOf: [
                {
                    use: [
                        {
                            loader: require.resolve('@svgr/webpack'),
                            options: {
                                prettier: false,
                                svgo: true,
                                svgoConfig: {
                                    plugins: [
                                        {
                                            name: 'preset-default',
                                            params: {
                                                overrides: {
                                                    removeViewBox: false,
                                                },
                                            },
                                        },
                                    ],
                                },
                                titleProp: true,
                                ref: ![path_1.default],
                            },
                        },
                    ],
                    // We don't want to use SVGR loader for non-React source code
                    // ie we don't want to use SVGR for CSS files...
                    issuer: {
                        and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
                    },
                },
                {
                    use: [loaders.url({ folder: 'images' })],
                },
            ],
        }),
        otherAssets: () => ({
            use: [loaders.file({ folder: 'files' })],
            test: /\.(pdf|doc|docx|xls|xlsx|zip|rar)$/,
        }),
    };
    return { loaders, rules };
}
exports.getFileLoaderUtils = getFileLoaderUtils;
//# sourceMappingURL=webpackUtils.js.map