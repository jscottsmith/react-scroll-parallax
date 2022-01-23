"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.mdxToHtml = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const server_1 = (0, tslib_1.__importDefault)(require("react-dom/server"));
const runtime_1 = (0, tslib_1.__importDefault)(require("@mdx-js/runtime"));
const remark_mdx_remove_imports_1 = (0, tslib_1.__importDefault)(require("remark-mdx-remove-imports"));
const remark_mdx_remove_exports_1 = (0, tslib_1.__importDefault)(require("remark-mdx-remove-exports"));
/**
 * Transform mdx text to plain html text
 * Initially created to convert MDX blog posts to HTML for the RSS feed
 * without import/export nodes
 *
 * TODO not ideal implementation, won't work well with MDX elements!
 * TODO theme+global site config should be able to declare MDX comps in scope for rendering the RSS feeds
 * see also https://github.com/facebook/docusaurus/issues/4625
 */
function mdxToHtml(mdxStr) {
    return server_1.default.renderToString(react_1.default.createElement(runtime_1.default, { remarkPlugins: [remark_mdx_remove_imports_1.default, remark_mdx_remove_exports_1.default] }, [
        mdxStr,
    ]));
}
exports.mdxToHtml = mdxToHtml;
//# sourceMappingURL=mdxUtils.js.map