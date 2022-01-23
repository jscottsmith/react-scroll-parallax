/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReportingSeverity, TranslationFileContent, TranslationFile } from '@docusaurus/types';
import { posixPath as posixPathImport } from './posixPath';
export * from './constants';
export * from './mdxUtils';
export * from './normalizeUrl';
export * from './tags';
export declare const posixPath: typeof posixPathImport;
export * from './markdownParser';
export * from './markdownLinks';
export * from './escapePath';
export * from './slugger';
export { md5Hash, simpleHash, docuHash } from './hashUtils';
export { Globby, GlobExcludeDefault, createMatcher, createAbsoluteFilePathMatcher, } from './globUtils';
export * from './webpackUtils';
export declare function generate(generatedFilesDir: string, file: string, content: string, skipCache?: boolean): Promise<void>;
export declare function objectWithKeySorted<T>(obj: Record<string, T>): Record<string, T>;
/**
 * Convert filepath to url path.
 * Example: 'index.md' -> '/', 'foo/bar.js' -> '/foo/bar',
 */
export declare function fileToPath(file: string): string;
export declare function encodePath(userpath: string): string;
/**
 * Convert first string character to the upper case.
 * E.g: docusaurus -> Docusaurus
 */
export declare function upperFirst(str: string): string;
/**
 * Generate unique React Component Name.
 * E.g: /foo-bar -> FooBar096
 */
export declare function genComponentName(pagePath: string): string;
export declare function toMessageRelativeFilePath(filePath: string): string;
/**
 * Generate unique chunk name given a module path.
 */
export declare function genChunkName(modulePath: string, prefix?: string, preferredName?: string, shortId?: boolean): string;
export declare function idx(target: any, keyPaths?: string | (string | number)[]): any;
/**
 * Given a filepath and dirpath, get the first directory.
 */
export declare function getSubFolder(file: string, refDir: string): string | null;
/**
 * Alias filepath relative to site directory, very useful so that we
 * don't expose user's site structure.
 * Example: some/path/to/website/docs/foo.md -> @site/docs/foo.md
 */
export declare function aliasedSitePath(filePath: string, siteDir: string): string;
export declare function getEditUrl(fileRelativePath: string, editUrl?: string): string | undefined;
export declare function isValidPathname(str: string): boolean;
export declare function resolvePathname(to: string, from?: string): string;
export declare function addLeadingSlash(str: string): string;
export declare function addTrailingPathSeparator(str: string): string;
export declare function addTrailingSlash(str: string): string;
export declare function removeTrailingSlash(str: string): string;
export declare function removeSuffix(str: string, suffix: string): string;
export declare function removePrefix(str: string, prefix: string): string;
export declare function getElementsAround<T>(array: T[], aroundIndex: number): {
    next: T | undefined;
    previous: T | undefined;
};
export declare function getPluginI18nPath({ siteDir, locale, pluginName, pluginId, subPaths, }: {
    siteDir: string;
    locale: string;
    pluginName: string;
    pluginId?: string | undefined;
    subPaths?: string[];
}): string;
export declare function mapAsyncSequencial<T, R>(array: T[], action: (t: T) => Promise<R>): Promise<R[]>;
export declare function findAsyncSequential<T>(array: T[], predicate: (t: T) => Promise<boolean>): Promise<T | undefined>;
export declare function findFolderContainingFile(folderPaths: string[], relativeFilePath: string): Promise<string | undefined>;
export declare function getFolderContainingFile(folderPaths: string[], relativeFilePath: string): Promise<string>;
export declare function reportMessage(message: string, reportingSeverity: ReportingSeverity): void;
export declare function mergeTranslations(contents: TranslationFileContent[]): TranslationFileContent;
export declare function getSwizzledComponent(componentPath: string): string | undefined;
export declare function updateTranslationFileMessages(translationFile: TranslationFile, updateMessage: (message: string) => string): TranslationFile;
export declare function parseMarkdownHeadingId(heading: string): {
    text: string;
    id?: string;
};
//# sourceMappingURL=index.d.ts.map