/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export declare function createExcerpt(fileString: string): string | undefined;
export declare function parseFrontMatter(markdownFileContent: string): {
    frontMatter: Record<string, unknown>;
    content: string;
};
export declare function parseMarkdownContentTitle(contentUntrimmed: string, options?: {
    removeContentTitle?: boolean;
}): {
    content: string;
    contentTitle: string | undefined;
};
declare type ParsedMarkdown = {
    frontMatter: Record<string, unknown>;
    content: string;
    contentTitle: string | undefined;
    excerpt: string | undefined;
};
export declare function parseMarkdownString(markdownFileContent: string, options?: {
    removeContentTitle?: boolean;
}): ParsedMarkdown;
export declare function parseMarkdownFile(source: string, options?: {
    removeContentTitle?: boolean;
}): Promise<ParsedMarkdown>;
export {};
//# sourceMappingURL=markdownParser.d.ts.map