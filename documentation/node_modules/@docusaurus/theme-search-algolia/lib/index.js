"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateThemeConfig = void 0;
const tslib_1 = require("tslib");
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const fs_1 = (0, tslib_1.__importDefault)(require("fs"));
const eta_1 = require("eta");
const utils_1 = require("@docusaurus/utils");
const theme_translations_1 = require("@docusaurus/theme-translations");
const logger_1 = (0, tslib_1.__importDefault)(require("@docusaurus/logger"));
const opensearch_1 = (0, tslib_1.__importDefault)(require("./templates/opensearch"));
const lodash_1 = require("lodash");
const getCompiledOpenSearchTemplate = (0, lodash_1.memoize)(() => (0, eta_1.compile)(opensearch_1.default.trim()));
function renderOpenSearchTemplate(data) {
    const compiled = getCompiledOpenSearchTemplate();
    return compiled(data, eta_1.defaultConfig);
}
const OPEN_SEARCH_FILENAME = 'opensearch.xml';
function theme(context) {
    const { baseUrl, siteConfig: { title, url, favicon }, i18n: { currentLocale }, } = context;
    const pageComponent = './theme/SearchPage/index.js';
    const pagePath = (0, utils_1.getSwizzledComponent)(pageComponent) ||
        path_1.default.resolve(__dirname, pageComponent);
    return {
        name: 'docusaurus-theme-search-algolia',
        getPathsToWatch() {
            return [pagePath];
        },
        getThemePath() {
            return path_1.default.resolve(__dirname, './theme');
        },
        getTypeScriptThemePath() {
            return path_1.default.resolve(__dirname, '..', 'src', 'theme');
        },
        getDefaultCodeTranslationMessages() {
            return (0, theme_translations_1.readDefaultCodeTranslationMessages)({
                locale: currentLocale,
                name: 'theme-search-algolia',
            });
        },
        async contentLoaded({ actions: { addRoute } }) {
            addRoute({
                path: (0, utils_1.normalizeUrl)([baseUrl, 'search']),
                component: pagePath,
                exact: true,
            });
        },
        async postBuild({ outDir }) {
            try {
                fs_1.default.writeFileSync(path_1.default.join(outDir, OPEN_SEARCH_FILENAME), renderOpenSearchTemplate({
                    title,
                    url: url + baseUrl,
                    favicon: favicon ? (0, utils_1.normalizeUrl)([url, baseUrl, favicon]) : null,
                }));
            }
            catch (e) {
                logger_1.default.error('Generating OpenSearch file failed.');
                throw e;
            }
        },
        injectHtmlTags() {
            return {
                headTags: [
                    {
                        tagName: 'link',
                        attributes: {
                            rel: 'search',
                            type: 'application/opensearchdescription+xml',
                            title,
                            href: (0, utils_1.normalizeUrl)([baseUrl, OPEN_SEARCH_FILENAME]),
                        },
                    },
                ],
            };
        },
    };
}
exports.default = theme;
var validateThemeConfig_1 = require("./validateThemeConfig");
Object.defineProperty(exports, "validateThemeConfig", { enumerable: true, get: function () { return validateThemeConfig_1.validateThemeConfig; } });
