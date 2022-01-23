"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOptions = void 0;
const tslib_1 = require("tslib");
const fs_extra_1 = (0, tslib_1.__importDefault)(require("fs-extra"));
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const createSitemap_1 = (0, tslib_1.__importDefault)(require("./createSitemap"));
const pluginOptionSchema_1 = require("./pluginOptionSchema");
function pluginSitemap(_context, options) {
    return {
        name: 'docusaurus-plugin-sitemap',
        async postBuild({ siteConfig, routesPaths, outDir }) {
            // Generate sitemap.
            const generatedSitemap = await (0, createSitemap_1.default)(siteConfig, routesPaths, options);
            // Write sitemap file.
            const sitemapPath = path_1.default.join(outDir, 'sitemap.xml');
            try {
                await fs_extra_1.default.outputFile(sitemapPath, generatedSitemap);
            }
            catch (err) {
                throw new Error(`Writing sitemap failed: ${err}`);
            }
        },
    };
}
exports.default = pluginSitemap;
function validateOptions({ validate, options, }) {
    const validatedOptions = validate(pluginOptionSchema_1.PluginOptionSchema, options);
    return validatedOptions;
}
exports.validateOptions = validateOptions;
