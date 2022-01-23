/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export declare type ContentPaths = {
    contentPath: string;
    contentPathLocalized: string;
};
export declare type BrokenMarkdownLink<T extends ContentPaths> = {
    filePath: string;
    contentPaths: T;
    link: string;
};
export declare type ReplaceMarkdownLinksParams<T extends ContentPaths> = {
    siteDir: string;
    fileString: string;
    filePath: string;
    contentPaths: T;
    sourceToPermalink: Record<string, string>;
};
export declare type ReplaceMarkdownLinksReturn<T extends ContentPaths> = {
    newContent: string;
    brokenMarkdownLinks: BrokenMarkdownLink<T>[];
};
export declare function replaceMarkdownLinks<T extends ContentPaths>({ siteDir, fileString, filePath, contentPaths, sourceToPermalink, }: ReplaceMarkdownLinksParams<T>): ReplaceMarkdownLinksReturn<T>;
//# sourceMappingURL=markdownLinks.d.ts.map