"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMarkdownFile = exports.parseMarkdownString = exports.parseMarkdownContentTitle = exports.parseFrontMatter = exports.createExcerpt = void 0;
const tslib_1 = require("tslib");
const logger_1 = (0, tslib_1.__importDefault)(require("@docusaurus/logger"));
const fs_extra_1 = (0, tslib_1.__importDefault)(require("fs-extra"));
const gray_matter_1 = (0, tslib_1.__importDefault)(require("gray-matter"));
// Hacky way of stripping out import statements from the excerpt
// TODO: Find a better way to do so, possibly by compiling the Markdown content,
// stripping out HTML tags and obtaining the first line.
function createExcerpt(fileString) {
    const fileLines = fileString
        .trimLeft()
        // Remove Markdown alternate title
        .replace(/^[^\n]*\n[=]+/g, '')
        .split('\n');
    let inCode = false;
    /* eslint-disable no-continue */
    // eslint-disable-next-line no-restricted-syntax
    for (const fileLine of fileLines) {
        // Skip empty line.
        if (!fileLine.trim()) {
            continue;
        }
        // Skip import/export declaration.
        if (/^\s*?import\s.*(from.*)?;?|export\s.*{.*};?/.test(fileLine)) {
            continue;
        }
        // Skip code block line.
        if (fileLine.trim().startsWith('```')) {
            inCode = !inCode;
            continue;
        }
        else if (inCode) {
            continue;
        }
        const cleanedLine = fileLine
            // Remove HTML tags.
            .replace(/<[^>]*>/g, '')
            // Remove Title headers
            .replace(/^#\s*([^#]*)\s*#?/gm, '')
            // Remove Markdown + ATX-style headers
            .replace(/^#{1,6}\s*([^#]*)\s*(#{1,6})?/gm, '$1')
            // Remove emphasis and strikethroughs.
            .replace(/([*_~]{1,3})(\S.*?\S{0,1})\1/g, '$2')
            // Remove images.
            .replace(/!\[(.*?)\][[(].*?[\])]/g, '$1')
            // Remove footnotes.
            .replace(/\[\^.+?\](: .*?$)?/g, '')
            // Remove inline links.
            .replace(/\[(.*?)\][[(].*?[\])]/g, '$1')
            // Remove inline code.
            .replace(/`(.+?)`/g, '$1')
            // Remove blockquotes.
            .replace(/^\s{0,3}>\s?/g, '')
            // Remove admonition definition.
            .replace(/(:{3}.*)/, '')
            // Remove Emoji names within colons include preceding whitespace.
            .replace(/\s?(:(::|[^:\n])+:)/g, '')
            // Remove custom Markdown heading id.
            .replace(/{#*[\w-]+}/, '')
            .trim();
        if (cleanedLine) {
            return cleanedLine;
        }
    }
    return undefined;
}
exports.createExcerpt = createExcerpt;
function parseFrontMatter(markdownFileContent) {
    var _a;
    const { data, content } = (0, gray_matter_1.default)(markdownFileContent);
    return {
        frontMatter: data !== null && data !== void 0 ? data : {},
        content: (_a = content === null || content === void 0 ? void 0 : content.trim()) !== null && _a !== void 0 ? _a : '',
    };
}
exports.parseFrontMatter = parseFrontMatter;
// Try to convert markdown heading as text
// Does not need to be perfect, it is only used as a fallback when frontMatter.title is not provided
// For now, we just unwrap possible inline code blocks (# `config.js`)
function toTextContentTitle(contentTitle) {
    if (contentTitle.startsWith('`') && contentTitle.endsWith('`')) {
        return contentTitle.substring(1, contentTitle.length - 1);
    }
    return contentTitle;
}
function parseMarkdownContentTitle(contentUntrimmed, options) {
    var _a, _b;
    const removeContentTitleOption = (_a = options === null || options === void 0 ? void 0 : options.removeContentTitle) !== null && _a !== void 0 ? _a : false;
    const content = contentUntrimmed.trim();
    const IMPORT_STATEMENT = /import\s+(([\w*{}\s\n,]+)from\s+)?["'\s]([@\w/_.-]+)["'\s];?|\n/.source;
    const REGULAR_TITLE = /(?<pattern>#\s*(?<title>[^#\n{]*)+[ \t]*(?<suffix>({#*[\w-]+})|#)?\n*?)/
        .source;
    const ALTERNATE_TITLE = /(?<pattern>\s*(?<title>[^\n]*)\s*\n[=]+)/.source;
    const regularTitleMatch = new RegExp(`^(?:${IMPORT_STATEMENT})*?${REGULAR_TITLE}`, 'g').exec(content);
    const alternateTitleMatch = new RegExp(`^(?:${IMPORT_STATEMENT})*?${ALTERNATE_TITLE}`, 'g').exec(content);
    const titleMatch = regularTitleMatch !== null && regularTitleMatch !== void 0 ? regularTitleMatch : alternateTitleMatch;
    const { pattern, title } = (_b = titleMatch === null || titleMatch === void 0 ? void 0 : titleMatch.groups) !== null && _b !== void 0 ? _b : {};
    if (!pattern || !title) {
        return { content, contentTitle: undefined };
    }
    else {
        const newContent = removeContentTitleOption
            ? content.replace(pattern, '')
            : content;
        return {
            content: newContent.trim(),
            contentTitle: toTextContentTitle(title.trim()).trim(),
        };
    }
}
exports.parseMarkdownContentTitle = parseMarkdownContentTitle;
function parseMarkdownString(markdownFileContent, options) {
    try {
        const { frontMatter, content: contentWithoutFrontMatter } = parseFrontMatter(markdownFileContent);
        const { content, contentTitle } = parseMarkdownContentTitle(contentWithoutFrontMatter, options);
        const excerpt = createExcerpt(content);
        return {
            frontMatter,
            content,
            contentTitle,
            excerpt,
        };
    }
    catch (e) {
        logger_1.default.error(`Error while parsing Markdown frontmatter.
This can happen if you use special characters in frontmatter values (try using double quotes around that value).`);
        throw e;
    }
}
exports.parseMarkdownString = parseMarkdownString;
async function parseMarkdownFile(source, options) {
    const markdownString = await fs_extra_1.default.readFile(source, 'utf-8');
    try {
        return parseMarkdownString(markdownString, options);
    }
    catch (e) {
        throw new Error(`Error while parsing Markdown file ${source}: "${e.message}".`);
    }
}
exports.parseMarkdownFile = parseMarkdownFile;
//# sourceMappingURL=markdownParser.js.map