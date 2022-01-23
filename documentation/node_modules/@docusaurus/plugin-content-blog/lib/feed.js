"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlogFeedFiles = exports.generateBlogFeed = void 0;
const tslib_1 = require("tslib");
const feed_1 = require("feed");
const utils_1 = require("@docusaurus/utils");
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const fs_extra_1 = (0, tslib_1.__importDefault)(require("fs-extra"));
// TODO this is temporary until we handle mdxToHtml better
// It's hard to convert reliably JSX/require calls  to an html feed content
// See https://github.com/facebook/docusaurus/issues/5664
function mdxToFeedContent(mdxContent) {
    try {
        return (0, utils_1.mdxToHtml)(mdxContent);
    }
    catch (e) {
        // TODO will we need a plugin option to configure how to handle such an error
        // Swallow the error on purpose for now, until we understand better the problem space
        return undefined;
    }
}
async function generateBlogFeed({ blogPosts, options, siteConfig, }) {
    if (!blogPosts.length) {
        return null;
    }
    const { feedOptions, routeBasePath } = options;
    const { url: siteUrl, baseUrl, title, favicon } = siteConfig;
    const blogBaseUrl = (0, utils_1.normalizeUrl)([siteUrl, baseUrl, routeBasePath]);
    const updated = (blogPosts[0] && blogPosts[0].metadata.date) ||
        new Date('2015-10-25T16:29:00.000-07:00'); // weird legacy magic date
    const feed = new feed_1.Feed({
        id: blogBaseUrl,
        title: feedOptions.title || `${title} Blog`,
        updated,
        language: feedOptions.language,
        link: blogBaseUrl,
        description: feedOptions.description || `${siteConfig.title} Blog`,
        favicon: favicon ? (0, utils_1.normalizeUrl)([siteUrl, baseUrl, favicon]) : undefined,
        copyright: feedOptions.copyright,
    });
    function toFeedAuthor(author) {
        // TODO ask author emails?
        // RSS feed requires email to render authors
        return { name: author.name, link: author.url };
    }
    blogPosts.forEach((post) => {
        const { id, metadata: { title: metadataTitle, permalink, date, description, authors }, } = post;
        const feedItem = {
            title: metadataTitle,
            id,
            link: (0, utils_1.normalizeUrl)([siteUrl, permalink]),
            date,
            description,
            content: mdxToFeedContent(post.content),
        };
        // json1() method takes the first item of authors array
        // it causes an error when authors array is empty
        const feedItemAuthors = authors.map(toFeedAuthor);
        if (feedItemAuthors.length > 0) {
            feedItem.author = feedItemAuthors;
        }
        feed.addItem(feedItem);
    });
    return feed;
}
exports.generateBlogFeed = generateBlogFeed;
async function createBlogFeedFile({ feed, feedType, generatePath, }) {
    const [feedContent, feedPath] = (() => {
        switch (feedType) {
            case 'rss':
                return [feed.rss2(), 'rss.xml'];
            case 'json':
                return [feed.json1(), 'feed.json'];
            case 'atom':
                return [feed.atom1(), 'atom.xml'];
            default:
                throw new Error(`Feed type ${feedType} not supported.`);
        }
    })();
    try {
        await fs_extra_1.default.outputFile(path_1.default.join(generatePath, feedPath), feedContent);
    }
    catch (err) {
        throw new Error(`Generating ${feedType} feed failed: ${err}.`);
    }
}
async function createBlogFeedFiles({ blogPosts, options, siteConfig, outDir, }) {
    const feed = await generateBlogFeed({ blogPosts, options, siteConfig });
    const feedTypes = options.feedOptions.type;
    if (!feed || !feedTypes) {
        return;
    }
    await Promise.all(feedTypes.map((feedType) => createBlogFeedFile({
        feed,
        feedType,
        generatePath: path_1.default.join(outDir, options.routeBasePath),
    })));
}
exports.createBlogFeedFiles = createBlogFeedFiles;
