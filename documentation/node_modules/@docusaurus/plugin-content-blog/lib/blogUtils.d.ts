/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { PluginOptions, BlogPost, BlogContentPaths, BlogMarkdownLoaderOptions, BlogTags } from './types';
import { LoadContext } from '@docusaurus/types';
export declare function truncate(fileString: string, truncateMarker: RegExp): string;
export declare function getSourceToPermalink(blogPosts: BlogPost[]): Record<string, string>;
export declare function getBlogTags(blogPosts: BlogPost[]): BlogTags;
declare type ParsedBlogFileName = {
    date: Date | undefined;
    text: string;
    slug: string;
};
export declare function parseBlogFileName(blogSourceRelative: string): ParsedBlogFileName;
export declare function generateBlogPosts(contentPaths: BlogContentPaths, context: LoadContext, options: PluginOptions): Promise<BlogPost[]>;
export declare type LinkifyParams = {
    filePath: string;
    fileString: string;
} & Pick<BlogMarkdownLoaderOptions, 'sourceToPermalink' | 'siteDir' | 'contentPaths' | 'onBrokenMarkdownLink'>;
export declare function linkify({ filePath, contentPaths, fileString, siteDir, sourceToPermalink, onBrokenMarkdownLink, }: LinkifyParams): string;
export declare function getContentPathList(contentPaths: BlogContentPaths): string[];
export {};
