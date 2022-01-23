/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Feed } from 'feed';
import { PluginOptions, BlogPost } from './types';
import { DocusaurusConfig } from '@docusaurus/types';
export declare function generateBlogFeed({ blogPosts, options, siteConfig, }: {
    blogPosts: BlogPost[];
    options: PluginOptions;
    siteConfig: DocusaurusConfig;
}): Promise<Feed | null>;
export declare function createBlogFeedFiles({ blogPosts, options, siteConfig, outDir, }: {
    blogPosts: BlogPost[];
    options: PluginOptions;
    siteConfig: DocusaurusConfig;
    outDir: string;
}): Promise<void>;
