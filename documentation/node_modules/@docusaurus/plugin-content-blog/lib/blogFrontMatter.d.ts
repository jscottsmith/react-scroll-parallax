/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { FrontMatterTag } from '@docusaurus/utils';
export declare type BlogPostFrontMatterAuthor = Record<string, unknown> & {
    key?: string;
    name?: string;
    imageURL?: string;
    url?: string;
    title?: string;
};
export declare type BlogPostFrontMatterAuthors = string | BlogPostFrontMatterAuthor | (string | BlogPostFrontMatterAuthor)[];
export declare type BlogPostFrontMatter = {
    id?: string;
    title?: string;
    description?: string;
    tags?: FrontMatterTag[];
    slug?: string;
    draft?: boolean;
    date?: Date | string;
    authors?: BlogPostFrontMatterAuthors;
    author?: string;
    author_title?: string;
    author_url?: string;
    author_image_url?: string;
    /** @deprecated */
    authorTitle?: string;
    /** @deprecated */
    authorURL?: string;
    /** @deprecated */
    authorImageURL?: string;
    image?: string;
    keywords?: string[];
    hide_table_of_contents?: boolean;
    toc_min_heading_level?: number;
    toc_max_heading_level?: number;
};
export declare function validateBlogPostFrontMatter(frontMatter: Record<string, unknown>): BlogPostFrontMatter;
