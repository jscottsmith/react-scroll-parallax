/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Transform mdx text to plain html text
 * Initially created to convert MDX blog posts to HTML for the RSS feed
 * without import/export nodes
 *
 * TODO not ideal implementation, won't work well with MDX elements!
 * TODO theme+global site config should be able to declare MDX comps in scope for rendering the RSS feeds
 * see also https://github.com/facebook/docusaurus/issues/4625
 */
export declare function mdxToHtml(mdxStr: string): string;
//# sourceMappingURL=mdxUtils.d.ts.map