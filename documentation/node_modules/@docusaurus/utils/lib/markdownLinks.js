"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceMarkdownLinks = void 0;
const tslib_1 = require("tslib");
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const index_1 = require("./index");
function replaceMarkdownLinks({ siteDir, fileString, filePath, contentPaths, sourceToPermalink, }) {
    const { contentPath, contentPathLocalized } = contentPaths;
    const brokenMarkdownLinks = [];
    // Replace internal markdown linking (except in fenced blocks).
    let fencedBlock = false;
    const lines = fileString.split('\n').map((line) => {
        if (line.trim().startsWith('```')) {
            fencedBlock = !fencedBlock;
        }
        if (fencedBlock) {
            return line;
        }
        let modifiedLine = line;
        // Replace inline-style links or reference-style links e.g:
        // This is [Document 1](doc1.md) -> we replace this doc1.md with correct link
        // [doc1]: doc1.md -> we replace this doc1.md with correct link
        const mdRegex = /(?:(?:\]\()|(?:\]:\s?))(?!https)([^'")\]\s>]+\.mdx?)/g;
        let mdMatch = mdRegex.exec(modifiedLine);
        while (mdMatch !== null) {
            // Replace it to correct html link.
            const mdLink = mdMatch[1];
            const sourcesToTry = [
                path_1.default.resolve(path_1.default.dirname(filePath), decodeURIComponent(mdLink)),
                `${contentPathLocalized}/${decodeURIComponent(mdLink)}`,
                `${contentPath}/${decodeURIComponent(mdLink)}`,
            ];
            const aliasedSourceMatch = sourcesToTry
                .map((source) => (0, index_1.aliasedSitePath)(source, siteDir))
                .find((source) => sourceToPermalink[source]);
            const permalink = aliasedSourceMatch
                ? sourceToPermalink[aliasedSourceMatch]
                : undefined;
            if (permalink) {
                // MDX won't be happy if the permalink contains a space, we need to convert it to %20
                const encodedPermalink = permalink
                    .split('/')
                    .map((part) => part.replace(/\s/g, '%20'))
                    .join('/');
                modifiedLine = modifiedLine.replace(mdLink, encodedPermalink);
            }
            else {
                const brokenMarkdownLink = {
                    contentPaths,
                    filePath,
                    link: mdLink,
                };
                brokenMarkdownLinks.push(brokenMarkdownLink);
            }
            mdMatch = mdRegex.exec(modifiedLine);
        }
        return modifiedLine;
    });
    const newContent = lines.join('\n');
    return { newContent, brokenMarkdownLinks };
}
exports.replaceMarkdownLinks = replaceMarkdownLinks;
//# sourceMappingURL=markdownLinks.js.map