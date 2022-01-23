"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkify = void 0;
const versions_1 = require("../versions");
const utils_1 = require("@docusaurus/utils");
function getVersion(filePath, options) {
    const versionFound = options.versionsMetadata.find((version) => (0, versions_1.getDocsDirPaths)(version).some((docsDirPath) => filePath.startsWith(docsDirPath)));
    if (!versionFound) {
        throw new Error(`Unexpected error: Markdown file at "${filePath}" does not belong to any docs version!`);
    }
    return versionFound;
}
function linkify(fileString, filePath, options) {
    const { siteDir, sourceToPermalink, onBrokenMarkdownLink } = options;
    const { newContent, brokenMarkdownLinks } = (0, utils_1.replaceMarkdownLinks)({
        siteDir,
        fileString,
        filePath,
        contentPaths: getVersion(filePath, options),
        sourceToPermalink,
    });
    brokenMarkdownLinks.forEach((l) => onBrokenMarkdownLink(l));
    return newContent;
}
exports.linkify = linkify;
