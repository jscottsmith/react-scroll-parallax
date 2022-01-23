/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Author, BlogContentPaths } from './types';
import { BlogPostFrontMatter } from './blogFrontMatter';
export declare type AuthorsMap = Record<string, Author>;
export declare function validateAuthorsMapFile(content: unknown): AuthorsMap;
export declare function readAuthorsMapFile(filePath: string): Promise<AuthorsMap | undefined>;
declare type AuthorsMapParams = {
    authorsMapPath: string;
    contentPaths: BlogContentPaths;
};
export declare function getAuthorsMapFilePath({ authorsMapPath, contentPaths, }: AuthorsMapParams): Promise<string | undefined>;
export declare function getAuthorsMap(params: AuthorsMapParams): Promise<AuthorsMap | undefined>;
declare type AuthorsParam = {
    frontMatter: BlogPostFrontMatter;
    authorsMap: AuthorsMap | undefined;
};
export declare function getBlogPostAuthors(params: AuthorsParam): Author[];
export {};
