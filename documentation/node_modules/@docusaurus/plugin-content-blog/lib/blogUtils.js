"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContentPathList = exports.linkify = exports.generateBlogPosts = exports.parseBlogFileName = exports.getBlogTags = exports.getSourceToPermalink = exports.truncate = void 0;
const tslib_1 = require("tslib");
const fs_extra_1 = (0, tslib_1.__importDefault)(require("fs-extra"));
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const reading_time_1 = (0, tslib_1.__importDefault)(require("reading-time"));
const lodash_1 = require("lodash");
const utils_1 = require("@docusaurus/utils");
const blogFrontMatter_1 = require("./blogFrontMatter");
const authors_1 = require("./authors");
const logger_1 = (0, tslib_1.__importDefault)(require("@docusaurus/logger"));
function truncate(fileString, truncateMarker) {
    return fileString.split(truncateMarker, 1).shift();
}
exports.truncate = truncate;
function getSourceToPermalink(blogPosts) {
    return (0, lodash_1.mapValues)((0, lodash_1.keyBy)(blogPosts, (item) => item.metadata.source), (v) => v.metadata.permalink);
}
exports.getSourceToPermalink = getSourceToPermalink;
function getBlogTags(blogPosts) {
    const groups = (0, utils_1.groupTaggedItems)(blogPosts, (blogPost) => blogPost.metadata.tags);
    return (0, lodash_1.mapValues)(groups, (group) => ({
        name: group.tag.label,
        items: group.items.map((item) => item.id),
        permalink: group.tag.permalink,
    }));
}
exports.getBlogTags = getBlogTags;
const DATE_FILENAME_REGEX = /^(?<date>\d{4}[-/]\d{1,2}[-/]\d{1,2})[-/]?(?<text>.*?)(\/index)?.mdx?$/;
function parseBlogFileName(blogSourceRelative) {
    const dateFilenameMatch = blogSourceRelative.match(DATE_FILENAME_REGEX);
    if (dateFilenameMatch) {
        const dateString = dateFilenameMatch.groups.date;
        const text = dateFilenameMatch.groups.text;
        // Always treat dates as UTC by adding the `Z`
        const date = new Date(`${dateString}Z`);
        const slugDate = dateString.replace(/-/g, '/');
        const slug = `/${slugDate}/${text}`;
        return { date, text, slug };
    }
    else {
        const text = blogSourceRelative.replace(/(\/index)?\.mdx?$/, '');
        const slug = `/${text}`;
        return { date: undefined, text, slug };
    }
}
exports.parseBlogFileName = parseBlogFileName;
function formatBlogPostDate(locale, date) {
    try {
        return new Intl.DateTimeFormat(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: 'UTC',
        }).format(date);
    }
    catch (e) {
        throw new Error(`Can't format blog post date "${date}"`);
    }
}
async function parseBlogPostMarkdownFile(blogSourceAbsolute) {
    const result = await (0, utils_1.parseMarkdownFile)(blogSourceAbsolute, {
        removeContentTitle: true,
    });
    return {
        ...result,
        frontMatter: (0, blogFrontMatter_1.validateBlogPostFrontMatter)(result.frontMatter),
    };
}
const defaultReadingTime = ({ content, options }) => (0, reading_time_1.default)(content, options).minutes;
async function processBlogSourceFile(blogSourceRelative, contentPaths, context, options, authorsMap) {
    var _a, _b, _c, _d;
    const { siteConfig: { baseUrl }, siteDir, i18n, } = context;
    const { routeBasePath, tagsBasePath: tagsRouteBasePath, truncateMarker, showReadingTime, editUrl, } = options;
    // Lookup in localized folder in priority
    const blogDirPath = await (0, utils_1.getFolderContainingFile)(getContentPathList(contentPaths), blogSourceRelative);
    const blogSourceAbsolute = path_1.default.join(blogDirPath, blogSourceRelative);
    const { frontMatter, content, contentTitle, excerpt } = await parseBlogPostMarkdownFile(blogSourceAbsolute);
    const aliasedSource = (0, utils_1.aliasedSitePath)(blogSourceAbsolute, siteDir);
    if (frontMatter.draft && process.env.NODE_ENV === 'production') {
        return undefined;
    }
    if (frontMatter.id) {
        logger_1.default.warn `name=${'id'} header option is deprecated in path=${blogSourceRelative} file. Please use name=${'slug'} option instead.`;
    }
    const parsedBlogFileName = parseBlogFileName(blogSourceRelative);
    async function getDate() {
        // Prefer user-defined date.
        if (frontMatter.date) {
            return new Date(frontMatter.date);
        }
        else if (parsedBlogFileName.date) {
            return parsedBlogFileName.date;
        }
        // Fallback to file create time
        return (await fs_extra_1.default.stat(blogSourceAbsolute)).birthtime;
    }
    const date = await getDate();
    const formattedDate = formatBlogPostDate(i18n.currentLocale, date);
    const title = (_b = (_a = frontMatter.title) !== null && _a !== void 0 ? _a : contentTitle) !== null && _b !== void 0 ? _b : parsedBlogFileName.text;
    const description = (_d = (_c = frontMatter.description) !== null && _c !== void 0 ? _c : excerpt) !== null && _d !== void 0 ? _d : '';
    const slug = frontMatter.slug || parsedBlogFileName.slug;
    const permalink = (0, utils_1.normalizeUrl)([baseUrl, routeBasePath, slug]);
    function getBlogEditUrl() {
        const blogPathRelative = path_1.default.relative(blogDirPath, path_1.default.resolve(blogSourceAbsolute));
        if (typeof editUrl === 'function') {
            return editUrl({
                blogDirPath: (0, utils_1.posixPath)(path_1.default.relative(siteDir, blogDirPath)),
                blogPath: (0, utils_1.posixPath)(blogPathRelative),
                permalink,
                locale: i18n.currentLocale,
            });
        }
        else if (typeof editUrl === 'string') {
            const isLocalized = blogDirPath === contentPaths.contentPathLocalized;
            const fileContentPath = isLocalized && options.editLocalizedFiles
                ? contentPaths.contentPathLocalized
                : contentPaths.contentPath;
            const contentPathEditUrl = (0, utils_1.normalizeUrl)([
                editUrl,
                (0, utils_1.posixPath)(path_1.default.relative(siteDir, fileContentPath)),
            ]);
            return (0, utils_1.getEditUrl)(blogPathRelative, contentPathEditUrl);
        }
        return undefined;
    }
    const tagsBasePath = (0, utils_1.normalizeUrl)([
        baseUrl,
        routeBasePath,
        tagsRouteBasePath,
    ]);
    const authors = (0, authors_1.getBlogPostAuthors)({ authorsMap, frontMatter });
    return {
        id: slug,
        metadata: {
            permalink,
            editUrl: getBlogEditUrl(),
            source: aliasedSource,
            title,
            description,
            date,
            formattedDate,
            tags: (0, utils_1.normalizeFrontMatterTags)(tagsBasePath, frontMatter.tags),
            readingTime: showReadingTime
                ? options.readingTime({
                    content,
                    frontMatter,
                    defaultReadingTime,
                })
                : undefined,
            truncated: (truncateMarker === null || truncateMarker === void 0 ? void 0 : truncateMarker.test(content)) || false,
            authors,
        },
        content,
    };
}
async function generateBlogPosts(contentPaths, context, options) {
    const { include, exclude } = options;
    if (!fs_extra_1.default.existsSync(contentPaths.contentPath)) {
        return [];
    }
    const blogSourceFiles = await (0, utils_1.Globby)(include, {
        cwd: contentPaths.contentPath,
        ignore: exclude,
    });
    const authorsMap = await (0, authors_1.getAuthorsMap)({
        contentPaths,
        authorsMapPath: options.authorsMapPath,
    });
    const blogPosts = (await Promise.all(blogSourceFiles.map(async (blogSourceFile) => {
        try {
            return await processBlogSourceFile(blogSourceFile, contentPaths, context, options, authorsMap);
        }
        catch (e) {
            logger_1.default.error `Processing of blog source file failed for path path=${blogSourceFile}.`;
            throw e;
        }
    }))).filter(Boolean);
    blogPosts.sort((a, b) => b.metadata.date.getTime() - a.metadata.date.getTime());
    if (options.sortPosts === 'ascending') {
        return blogPosts.reverse();
    }
    return blogPosts;
}
exports.generateBlogPosts = generateBlogPosts;
function linkify({ filePath, contentPaths, fileString, siteDir, sourceToPermalink, onBrokenMarkdownLink, }) {
    const { newContent, brokenMarkdownLinks } = (0, utils_1.replaceMarkdownLinks)({
        siteDir,
        fileString,
        filePath,
        contentPaths,
        sourceToPermalink,
    });
    brokenMarkdownLinks.forEach((l) => onBrokenMarkdownLink(l));
    return newContent;
}
exports.linkify = linkify;
// Order matters: we look in priority in localized folder
function getContentPathList(contentPaths) {
    return [contentPaths.contentPathLocalized, contentPaths.contentPath];
}
exports.getContentPathList = getContentPathList;
