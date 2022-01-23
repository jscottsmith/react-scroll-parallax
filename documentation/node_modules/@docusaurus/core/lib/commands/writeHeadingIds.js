"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformMarkdownContent = exports.transformMarkdownHeadingLine = void 0;
const tslib_1 = require("tslib");
const fs_extra_1 = (0, tslib_1.__importDefault)(require("fs-extra"));
const logger_1 = (0, tslib_1.__importDefault)(require("@docusaurus/logger"));
const server_1 = require("../server");
const init_1 = (0, tslib_1.__importDefault)(require("../server/plugins/init"));
const utils_1 = require("@docusaurus/utils");
const utils_2 = require("../server/utils");
function unwrapMarkdownLinks(line) {
    return line.replace(/\[([^\]]+)\]\([^)]+\)/g, (match, p1) => p1);
}
function addHeadingId(line, slugger, maintainCase) {
    let headingLevel = 0;
    while (line.charAt(headingLevel) === '#') {
        headingLevel += 1;
    }
    const headingText = line.slice(headingLevel).trimEnd();
    const headingHashes = line.slice(0, headingLevel);
    const slug = slugger
        .slug(unwrapMarkdownLinks(headingText).trim(), { maintainCase })
        .replace(/^-+/, '')
        .replace(/-+$/, '');
    return `${headingHashes}${headingText} {#${slug}}`;
}
function transformMarkdownHeadingLine(line, slugger, options = { maintainCase: false, overwrite: false }) {
    const { maintainCase = false, overwrite = false } = options;
    if (!line.startsWith('#')) {
        throw new Error(`Line is not a Markdown heading: ${line}.`);
    }
    const parsedHeading = (0, utils_1.parseMarkdownHeadingId)(line);
    // Do not process if id is already there
    if (parsedHeading.id && !overwrite) {
        return line;
    }
    return addHeadingId(parsedHeading.text, slugger, maintainCase);
}
exports.transformMarkdownHeadingLine = transformMarkdownHeadingLine;
function transformMarkdownLine(line, slugger, options) {
    // Ignore h1 headings on purpose, as we don't create anchor links for those
    if (line.startsWith('##')) {
        return transformMarkdownHeadingLine(line, slugger, options);
    }
    else {
        return line;
    }
}
function transformMarkdownLines(lines, options) {
    let inCode = false;
    const slugger = (0, utils_1.createSlugger)();
    return lines.map((line) => {
        if (line.startsWith('```')) {
            inCode = !inCode;
            return line;
        }
        else {
            if (inCode) {
                return line;
            }
            return transformMarkdownLine(line, slugger, options);
        }
    });
}
function transformMarkdownContent(content, options) {
    return transformMarkdownLines(content.split('\n'), options).join('\n');
}
exports.transformMarkdownContent = transformMarkdownContent;
async function transformMarkdownFile(filepath, options) {
    const content = await fs_extra_1.default.readFile(filepath, 'utf8');
    const updatedContent = transformMarkdownLines(content.split('\n'), options).join('\n');
    if (content !== updatedContent) {
        await fs_extra_1.default.writeFile(filepath, updatedContent);
        return filepath;
    }
    return undefined;
}
// We only handle the "paths to watch" because these are the paths where the markdown files are
// Also we don't want to transform the site md docs that do not belong to a content plugin
// For example ./README.md should not be transformed
async function getPathsToWatch(siteDir) {
    const context = await (0, server_1.loadContext)(siteDir);
    const pluginConfigs = (0, server_1.loadPluginConfigs)(context);
    const plugins = (0, init_1.default)({
        pluginConfigs,
        context,
    });
    return plugins.flatMap((plugin) => { var _a, _b; return (_b = (_a = plugin === null || plugin === void 0 ? void 0 : plugin.getPathsToWatch) === null || _a === void 0 ? void 0 : _a.call(plugin)) !== null && _b !== void 0 ? _b : []; });
}
async function writeHeadingIds(siteDir, files, options) {
    const markdownFiles = await (0, utils_2.safeGlobby)(files ? [files] : await getPathsToWatch(siteDir), {
        expandDirectories: ['**/*.{md,mdx}'],
    });
    const result = await Promise.all(markdownFiles.map((p) => transformMarkdownFile(p, options)));
    const pathsModified = result.filter(Boolean);
    if (pathsModified.length) {
        logger_1.default.success `Heading ids added to Markdown files (number=${`${pathsModified.length}/${markdownFiles.length}`} files): ${pathsModified}`;
    }
    else {
        logger_1.default.warn `number=${markdownFiles.length} Markdown files already have explicit heading IDs. If you intend to overwrite the existing heading IDs, use the code=${'--overwrite'} option.`;
    }
}
exports.default = writeHeadingIds;
