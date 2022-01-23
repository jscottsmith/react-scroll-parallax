/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { RemarkAndRehypePluginOptions } from '@docusaurus/mdx-loader';
export declare type PluginOptions = RemarkAndRehypePluginOptions & {
    id?: string;
    path: string;
    routeBasePath: string;
    include: string[];
    exclude: string[];
    mdxPageComponent: string;
    admonitions: Record<string, unknown>;
};
export declare type JSXPageMetadata = {
    type: 'jsx';
    permalink: string;
    source: string;
};
export declare type MDXPageMetadata = {
    type: 'mdx';
    permalink: string;
    source: string;
};
export declare type Metadata = JSXPageMetadata | MDXPageMetadata;
export declare type LoadedContent = Metadata[];
export declare type PagesContentPaths = {
    contentPath: string;
    contentPathLocalized: string;
};
