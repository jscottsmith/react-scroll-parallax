/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { RemarkAndRehypePluginOptions } from '@docusaurus/mdx-loader';
import type { Tag } from '@docusaurus/utils';
import type { BrokenMarkdownLink, ContentPaths } from '@docusaurus/utils/lib/markdownLinks';
import { Overwrite } from 'utility-types';
import { BlogPostFrontMatter } from './blogFrontMatter';
export declare type BlogContentPaths = ContentPaths;
export interface BlogContent {
    blogSidebarTitle: string;
    blogPosts: BlogPost[];
    blogListPaginated: BlogPaginated[];
    blogTags: BlogTags;
    blogTagsListPath: string | null;
}
export declare type FeedType = 'rss' | 'atom' | 'json';
export declare type FeedOptions = {
    type?: FeedType[] | null;
    title?: string;
    description?: string;
    copyright: string;
    language?: string;
};
export declare type UserFeedOptions = Overwrite<Partial<FeedOptions>, {
    type?: FeedOptions['type'] | 'all';
}>;
export declare type EditUrlFunction = (editUrlParams: {
    blogDirPath: string;
    blogPath: string;
    permalink: string;
    locale: string;
}) => string | undefined;
declare type ReadingTimeOptions = {
    wordsPerMinute?: number;
    wordBound?: (char: string) => boolean;
};
export declare type ReadingTimeFunction = (params: {
    content: string;
    frontMatter?: BlogPostFrontMatter & Record<string, unknown>;
    options?: ReadingTimeOptions;
}) => number;
export declare type ReadingTimeFunctionOption = (params: Required<Omit<Parameters<ReadingTimeFunction>[0], 'options'>> & {
    defaultReadingTime: ReadingTimeFunction;
}) => number | undefined;
export declare type PluginOptions = RemarkAndRehypePluginOptions & {
    id?: string;
    path: string;
    routeBasePath: string;
    tagsBasePath: string;
    archiveBasePath: string;
    include: string[];
    exclude: string[];
    postsPerPage: number | 'ALL';
    blogListComponent: string;
    blogPostComponent: string;
    blogTagsListComponent: string;
    blogTagsPostsComponent: string;
    blogTitle: string;
    blogDescription: string;
    blogSidebarCount: number | 'ALL';
    blogSidebarTitle: string;
    truncateMarker: RegExp;
    showReadingTime: boolean;
    feedOptions: {
        type?: FeedType[] | null;
        title?: string;
        description?: string;
        copyright: string;
        language?: string;
    };
    editUrl?: string | EditUrlFunction;
    editLocalizedFiles?: boolean;
    admonitions: Record<string, unknown>;
    authorsMapPath: string;
    readingTime: ReadingTimeFunctionOption;
    sortPosts: 'ascending' | 'descending';
};
export declare type UserPluginOptions = Overwrite<Partial<PluginOptions>, {
    feedOptions?: UserFeedOptions;
}>;
export interface BlogTags {
    [key: string]: BlogTag;
}
export interface BlogTag {
    name: string;
    items: string[];
    permalink: string;
}
export interface BlogPost {
    id: string;
    metadata: MetaData;
    content: string;
}
export interface BlogPaginatedMetadata {
    permalink: string;
    page: number;
    postsPerPage: number;
    totalPages: number;
    totalCount: number;
    previousPage: string | null;
    nextPage: string | null;
    blogTitle: string;
    blogDescription: string;
}
export interface BlogPaginated {
    metadata: BlogPaginatedMetadata;
    items: string[];
}
export interface Author extends Record<string, unknown> {
    name?: string;
    imageURL?: string;
    url?: string;
    title?: string;
}
export interface MetaData {
    permalink: string;
    source: string;
    description: string;
    date: Date;
    formattedDate: string;
    tags: Tag[];
    title: string;
    readingTime?: number;
    prevItem?: Paginator;
    nextItem?: Paginator;
    truncated: boolean;
    editUrl?: string;
    authors: Author[];
}
export interface Assets {
    image?: string;
    authorsImageUrls: (string | undefined)[];
}
export interface Paginator {
    title: string;
    permalink: string;
}
export interface BlogItemsToMetadata {
    [key: string]: MetaData;
}
export interface TagsModule {
    [key: string]: TagModule;
}
export interface TagModule {
    allTagsPath: string;
    slug: string;
    name: string;
    count: number;
    permalink: string;
}
export declare type BlogBrokenMarkdownLink = BrokenMarkdownLink<BlogContentPaths>;
export declare type BlogMarkdownLoaderOptions = {
    siteDir: string;
    contentPaths: BlogContentPaths;
    truncateMarker: RegExp;
    sourceToPermalink: Record<string, string>;
    onBrokenMarkdownLink: (brokenMarkdownLink: BlogBrokenMarkdownLink) => void;
};
export {};
