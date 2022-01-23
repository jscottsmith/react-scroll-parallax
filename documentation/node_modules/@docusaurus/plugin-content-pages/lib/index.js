"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOptions = exports.getContentPathList = void 0;
const tslib_1 = require("tslib");
const fs_1 = (0, tslib_1.__importDefault)(require("fs"));
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const utils_1 = require("@docusaurus/utils");
const remark_admonitions_1 = (0, tslib_1.__importDefault)(require("remark-admonitions"));
const pluginOptionSchema_1 = require("./pluginOptionSchema");
function getContentPathList(contentPaths) {
    return [contentPaths.contentPathLocalized, contentPaths.contentPath];
}
exports.getContentPathList = getContentPathList;
const isMarkdownSource = (source) => source.endsWith('.md') || source.endsWith('.mdx');
function pluginContentPages(context, options) {
    var _a;
    if (options.admonitions) {
        options.remarkPlugins = options.remarkPlugins.concat([
            [remark_admonitions_1.default, options.admonitions || {}],
        ]);
    }
    const { siteConfig, siteDir, generatedFilesDir, i18n: { currentLocale }, } = context;
    const contentPaths = {
        contentPath: path_1.default.resolve(siteDir, options.path),
        contentPathLocalized: (0, utils_1.getPluginI18nPath)({
            siteDir,
            locale: currentLocale,
            pluginName: 'docusaurus-plugin-content-pages',
            pluginId: options.id,
        }),
    };
    const pluginDataDirRoot = path_1.default.join(generatedFilesDir, 'docusaurus-plugin-content-pages');
    const dataDir = path_1.default.join(pluginDataDirRoot, (_a = options.id) !== null && _a !== void 0 ? _a : utils_1.DEFAULT_PLUGIN_ID);
    return {
        name: 'docusaurus-plugin-content-pages',
        getPathsToWatch() {
            const { include = [] } = options;
            return getContentPathList(contentPaths).flatMap((contentPath) => include.map((pattern) => `${contentPath}/${pattern}`));
        },
        async loadContent() {
            const { include } = options;
            if (!fs_1.default.existsSync(contentPaths.contentPath)) {
                return null;
            }
            const { baseUrl } = siteConfig;
            const pagesFiles = await (0, utils_1.Globby)(include, {
                cwd: contentPaths.contentPath,
                ignore: options.exclude,
            });
            async function toMetadata(relativeSource) {
                // Lookup in localized folder in priority
                const contentPath = await (0, utils_1.getFolderContainingFile)(getContentPathList(contentPaths), relativeSource);
                const source = path_1.default.join(contentPath, relativeSource);
                const aliasedSourcePath = (0, utils_1.aliasedSitePath)(source, siteDir);
                const permalink = (0, utils_1.normalizeUrl)([
                    baseUrl,
                    options.routeBasePath,
                    (0, utils_1.encodePath)((0, utils_1.fileToPath)(relativeSource)),
                ]);
                if (isMarkdownSource(relativeSource)) {
                    // TODO: missing frontmatter validation/normalization here
                    return {
                        type: 'mdx',
                        permalink,
                        source: aliasedSourcePath,
                    };
                }
                else {
                    return {
                        type: 'jsx',
                        permalink,
                        source: aliasedSourcePath,
                    };
                }
            }
            return Promise.all(pagesFiles.map(toMetadata));
        },
        async contentLoaded({ content, actions }) {
            if (!content) {
                return;
            }
            const { addRoute, createData } = actions;
            await Promise.all(content.map(async (metadata) => {
                const { permalink, source } = metadata;
                if (metadata.type === 'mdx') {
                    await createData(
                    // Note that this created data path must be in sync with
                    // metadataPath provided to mdx-loader.
                    `${(0, utils_1.docuHash)(metadata.source)}.json`, JSON.stringify(metadata, null, 2));
                    addRoute({
                        path: permalink,
                        component: options.mdxPageComponent,
                        exact: true,
                        modules: {
                            content: source,
                        },
                    });
                }
                else {
                    addRoute({
                        path: permalink,
                        component: source,
                        exact: true,
                        modules: {
                            config: `@generated/docusaurus.config`,
                        },
                    });
                }
            }));
        },
        configureWebpack(_config, isServer, { getJSLoader }) {
            const { rehypePlugins, remarkPlugins, beforeDefaultRehypePlugins, beforeDefaultRemarkPlugins, } = options;
            const contentDirs = getContentPathList(contentPaths);
            return {
                resolve: {
                    alias: {
                        '~pages': pluginDataDirRoot,
                    },
                },
                module: {
                    rules: [
                        {
                            test: /(\.mdx?)$/,
                            include: contentDirs
                                // Trailing slash is important, see https://github.com/facebook/docusaurus/pull/3970
                                .map(utils_1.addTrailingPathSeparator),
                            use: [
                                getJSLoader({ isServer }),
                                {
                                    loader: require.resolve('@docusaurus/mdx-loader'),
                                    options: {
                                        remarkPlugins,
                                        rehypePlugins,
                                        beforeDefaultRehypePlugins,
                                        beforeDefaultRemarkPlugins,
                                        staticDirs: siteConfig.staticDirectories.map((dir) => path_1.default.resolve(siteDir, dir)),
                                        siteDir,
                                        isMDXPartial: (0, utils_1.createAbsoluteFilePathMatcher)(options.exclude, contentDirs),
                                        metadataPath: (mdxPath) => {
                                            // Note that metadataPath must be the same/in-sync as
                                            // the path from createData for each MDX.
                                            const aliasedSource = (0, utils_1.aliasedSitePath)(mdxPath, siteDir);
                                            return path_1.default.join(dataDir, `${(0, utils_1.docuHash)(aliasedSource)}.json`);
                                        },
                                    },
                                },
                                {
                                    loader: path_1.default.resolve(__dirname, './markdownLoader.js'),
                                    options: {
                                    // siteDir,
                                    // contentPath,
                                    },
                                },
                            ].filter(Boolean),
                        },
                    ],
                },
            };
        },
    };
}
exports.default = pluginContentPages;
function validateOptions({ validate, options, }) {
    const validatedOptions = validate(pluginOptionSchema_1.PluginOptionSchema, options);
    return validatedOptions;
}
exports.validateOptions = validateOptions;
