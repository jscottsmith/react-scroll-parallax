"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_extra_1 = require("fs-extra");
const mdx_1 = (0, tslib_1.__importDefault)(require("@mdx-js/mdx"));
const logger_1 = (0, tslib_1.__importDefault)(require("@docusaurus/logger"));
const remark_emoji_1 = (0, tslib_1.__importDefault)(require("remark-emoji"));
const utils_1 = require("@docusaurus/utils");
const stringify_object_1 = (0, tslib_1.__importDefault)(require("stringify-object"));
const headings_1 = (0, tslib_1.__importDefault)(require("./remark/headings"));
const toc_1 = (0, tslib_1.__importDefault)(require("./remark/toc"));
const unwrapMdxCodeBlocks_1 = (0, tslib_1.__importDefault)(require("./remark/unwrapMdxCodeBlocks"));
const transformImage_1 = (0, tslib_1.__importDefault)(require("./remark/transformImage"));
const transformLinks_1 = (0, tslib_1.__importDefault)(require("./remark/transformLinks"));
const { loaders: { inlineMarkdownImageFileLoader }, } = (0, utils_1.getFileLoaderUtils)();
const DEFAULT_OPTIONS = {
    rehypePlugins: [],
    remarkPlugins: [unwrapMdxCodeBlocks_1.default, remark_emoji_1.default, headings_1.default, toc_1.default],
    beforeDefaultRemarkPlugins: [],
    beforeDefaultRehypePlugins: [],
};
// When this throws, it generally means that there's no metadata file associated with this MDX document
// It can happen when using MDX partials (usually starting with _)
// That's why it's important to provide the "isMDXPartial" function in config
async function readMetadataPath(metadataPath) {
    try {
        return await (0, fs_extra_1.readFile)(metadataPath, 'utf8');
    }
    catch (e) {
        throw new Error(`MDX loader can't read MDX metadata file for path ${metadataPath}. Maybe the isMDXPartial option function was not provided?`);
    }
}
// Converts assets an object with Webpack require calls code
// This is useful for mdx files to reference co-located assets using relative paths
// Those assets should enter the Webpack assets pipeline and be hashed
// For now, we only handle that for images and paths starting with ./
// {image: "./myImage.png"} => {image: require("./myImage.png")}
function createAssetsExportCode(assets) {
    if (Object.keys(assets).length === 0) {
        return 'undefined';
    }
    // TODO implementation can be completed/enhanced
    function createAssetValueCode(assetValue) {
        if (Array.isArray(assetValue)) {
            const arrayItemCodes = assetValue.map((item) => { var _a; return (_a = createAssetValueCode(item)) !== null && _a !== void 0 ? _a : 'undefined'; });
            return `[${arrayItemCodes.join(', ')}]`;
        }
        // Only process string values starting with ./
        // We could enhance this logic and check if file exists on disc?
        if (typeof assetValue === 'string' && assetValue.startsWith('./')) {
            // TODO do we have other use-cases than image assets?
            // Probably not worth adding more support, as we want to move to Webpack 5 new asset system (https://github.com/facebook/docusaurus/pull/4708)
            const inlineLoader = inlineMarkdownImageFileLoader;
            return `require("${inlineLoader}${(0, utils_1.escapePath)(assetValue)}").default`;
        }
        return undefined;
    }
    const assetEntries = Object.entries(assets);
    const codeLines = assetEntries
        .map(([key, value]) => {
        const assetRequireCode = createAssetValueCode(value);
        return assetRequireCode ? `"${key}": ${assetRequireCode},` : undefined;
    })
        .filter(Boolean);
    return `{\n${codeLines.join('\n')}\n}`;
}
async function mdxLoader(fileString) {
    const callback = this.async();
    const filePath = this.resourcePath;
    const reqOptions = this.getOptions() || {};
    const { frontMatter, content: contentWithTitle } = (0, utils_1.parseFrontMatter)(fileString);
    const { content, contentTitle } = (0, utils_1.parseMarkdownContentTitle)(contentWithTitle, {
        removeContentTitle: reqOptions.removeContentTitle,
    });
    const hasFrontMatter = Object.keys(frontMatter).length > 0;
    const options = {
        ...reqOptions,
        remarkPlugins: [
            ...(reqOptions.beforeDefaultRemarkPlugins || []),
            ...DEFAULT_OPTIONS.remarkPlugins,
            [transformImage_1.default, { staticDirs: reqOptions.staticDirs, filePath }],
            [
                transformLinks_1.default,
                {
                    staticDirs: reqOptions.staticDirs,
                    filePath,
                    siteDir: reqOptions.siteDir,
                },
            ],
            ...(reqOptions.remarkPlugins || []),
        ],
        rehypePlugins: [
            ...(reqOptions.beforeDefaultRehypePlugins || []),
            ...DEFAULT_OPTIONS.rehypePlugins,
            ...(reqOptions.rehypePlugins || []),
        ],
        filepath: filePath,
    };
    let result;
    try {
        result = await (0, mdx_1.default)(content, options);
    }
    catch (err) {
        return callback(err);
    }
    // MDX partials are MDX files starting with _ or in a folder starting with _
    // Partial are not expected to have an associated metadata file or frontmatter
    const isMDXPartial = options.isMDXPartial && options.isMDXPartial(filePath);
    if (isMDXPartial && hasFrontMatter) {
        const errorMessage = `Docusaurus MDX partial files should not contain FrontMatter.
Those partial files use the _ prefix as a convention by default, but this is configurable.
File at ${filePath} contains FrontMatter that will be ignored:
${JSON.stringify(frontMatter, null, 2)}`;
        if (!options.isMDXPartialFrontMatterWarningDisabled) {
            const shouldError = process.env.NODE_ENV === 'test' || process.env.CI;
            if (shouldError) {
                return callback(new Error(errorMessage));
            }
            else {
                logger_1.default.warn(errorMessage);
            }
        }
    }
    function getMetadataPath() {
        if (!isMDXPartial) {
            // Read metadata for this MDX and export it.
            if (options.metadataPath && typeof options.metadataPath === 'function') {
                return options.metadataPath(filePath);
            }
        }
        return undefined;
    }
    const metadataPath = getMetadataPath();
    if (metadataPath) {
        this.addDependency(metadataPath);
    }
    const metadataJsonString = metadataPath
        ? await readMetadataPath(metadataPath)
        : undefined;
    const metadata = metadataJsonString
        ? JSON.parse(metadataJsonString)
        : undefined;
    const assets = reqOptions.createAssets && metadata
        ? reqOptions.createAssets({ frontMatter, metadata })
        : undefined;
    const exportsCode = `
export const frontMatter = ${(0, stringify_object_1.default)(frontMatter)};
export const contentTitle = ${(0, stringify_object_1.default)(contentTitle)};
${metadataJsonString ? `export const metadata = ${metadataJsonString};` : ''}
${assets ? `export const assets = ${createAssetsExportCode(assets)};` : ''}
`;
    const code = `
import React from 'react';
import { mdx } from '@mdx-js/react';

${exportsCode}
${result}
`;
    return callback(null, code);
}
exports.default = mdxLoader;
//# sourceMappingURL=index.js.map