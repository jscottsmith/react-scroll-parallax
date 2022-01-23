"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const utils_1 = require("@docusaurus/utils");
const unist_util_visit_1 = (0, tslib_1.__importDefault)(require("unist-util-visit"));
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const url_1 = (0, tslib_1.__importDefault)(require("url"));
const fs_extra_1 = (0, tslib_1.__importDefault)(require("fs-extra"));
const escape_html_1 = (0, tslib_1.__importDefault)(require("escape-html"));
const utils_2 = require("../utils");
const { loaders: { inlineMarkdownLinkFileLoader }, } = (0, utils_1.getFileLoaderUtils)();
const hashRegex = /#.*$/;
async function ensureAssetFileExist(fileSystemAssetPath, sourceFilePath) {
    const assetExists = await fs_extra_1.default.pathExists(fileSystemAssetPath);
    if (!assetExists) {
        throw new Error(`Asset ${(0, utils_1.toMessageRelativeFilePath)(fileSystemAssetPath)} used in ${(0, utils_1.toMessageRelativeFilePath)(sourceFilePath)} not found.`);
    }
}
// transform the link node to a jsx link with a require() call
function toAssetRequireNode({ node, filePath, requireAssetPath, }) {
    let relativeRequireAssetPath = (0, utils_1.posixPath)(path_1.default.relative(path_1.default.dirname(filePath), requireAssetPath));
    const hash = hashRegex.test(node.url)
        ? node.url.substr(node.url.indexOf('#'))
        : '';
    // nodejs does not like require("assets/file.pdf")
    relativeRequireAssetPath = relativeRequireAssetPath.startsWith('.')
        ? relativeRequireAssetPath
        : `./${relativeRequireAssetPath}`;
    const href = `require('${inlineMarkdownLinkFileLoader}${(0, utils_1.escapePath)(relativeRequireAssetPath)}').default${hash ? ` + '${hash}'` : ''}`;
    const children = (0, utils_2.stringifyContent)(node);
    const title = node.title ? ` title="${(0, escape_html_1.default)(node.title)}"` : '';
    node.type = 'jsx';
    node.value = `<a target="_blank" href={${href}}${title}>${children}</a>`;
}
// If the link looks like an asset link, we'll link to the asset,
// and use a require("assetUrl") (using webpack url-loader/file-loader)
// instead of navigating to such link
async function convertToAssetLinkIfNeeded(node, { filePath, siteDir, staticDirs }) {
    const assetPath = node.url.replace(hashRegex, '');
    const hasSiteAlias = assetPath.startsWith('@site/');
    const hasAssetLikeExtension = path_1.default.extname(assetPath) && !assetPath.match(/#|.md|.mdx|.html/);
    const looksLikeAssetLink = hasSiteAlias || hasAssetLikeExtension;
    if (!looksLikeAssetLink) {
        return;
    }
    function toAssetLinkNode(requireAssetPath) {
        toAssetRequireNode({
            node,
            filePath,
            requireAssetPath,
        });
    }
    if (assetPath.startsWith('@site/')) {
        const fileSystemAssetPath = path_1.default.join(siteDir, assetPath.replace('@site/', ''));
        await ensureAssetFileExist(fileSystemAssetPath, filePath);
        toAssetLinkNode(fileSystemAssetPath);
    }
    else if (path_1.default.isAbsolute(assetPath)) {
        // eslint-disable-next-line no-restricted-syntax
        for (const staticDir of staticDirs) {
            const fileSystemAssetPath = path_1.default.join(staticDir, assetPath);
            if (await fs_extra_1.default.pathExists(fileSystemAssetPath)) {
                toAssetLinkNode(fileSystemAssetPath);
                return;
            }
        }
    }
    else {
        const fileSystemAssetPath = path_1.default.join(path_1.default.dirname(filePath), assetPath);
        if (await fs_extra_1.default.pathExists(fileSystemAssetPath)) {
            toAssetLinkNode(fileSystemAssetPath);
        }
    }
}
async function processLinkNode(node, options) {
    var _a, _b, _c;
    if (!node.url) {
        // try to improve error feedback
        // see https://github.com/facebook/docusaurus/issues/3309#issuecomment-690371675
        const title = node.title || ((_a = node.children[0]) === null || _a === void 0 ? void 0 : _a.value) || '?';
        const line = ((_c = (_b = node === null || node === void 0 ? void 0 : node.position) === null || _b === void 0 ? void 0 : _b.start) === null || _c === void 0 ? void 0 : _c.line) || '?';
        throw new Error(`Markdown link URL is mandatory in "${(0, utils_1.toMessageRelativeFilePath)(options.filePath)}" file (title: ${title}, line: ${line}).`);
    }
    const parsedUrl = url_1.default.parse(node.url);
    if (parsedUrl.protocol) {
        return;
    }
    await convertToAssetLinkIfNeeded(node, options);
}
const plugin = (options) => {
    const transformer = async (root) => {
        const promises = [];
        (0, unist_util_visit_1.default)(root, 'link', (node) => {
            promises.push(processLinkNode(node, options));
        });
        await Promise.all(promises);
    };
    return transformer;
};
exports.default = plugin;
//# sourceMappingURL=index.js.map