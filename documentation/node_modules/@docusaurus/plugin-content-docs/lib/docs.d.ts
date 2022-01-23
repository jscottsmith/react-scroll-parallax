/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { LoadContext } from '@docusaurus/types';
import { DocFile, DocMetadataBase, MetadataOptions, PluginOptions, VersionMetadata, LoadedVersion } from './types';
import { SidebarsUtils } from './sidebars/utils';
declare type LastUpdateOptions = Pick<PluginOptions, 'showLastUpdateAuthor' | 'showLastUpdateTime'>;
export declare function readDocFile(versionMetadata: Pick<VersionMetadata, 'contentPath' | 'contentPathLocalized'>, source: string, options: LastUpdateOptions): Promise<DocFile>;
export declare function readVersionDocs(versionMetadata: VersionMetadata, options: Pick<PluginOptions, 'include' | 'exclude' | 'showLastUpdateAuthor' | 'showLastUpdateTime'>): Promise<DocFile[]>;
export declare function processDocMetadata(args: {
    docFile: DocFile;
    versionMetadata: VersionMetadata;
    context: LoadContext;
    options: MetadataOptions;
}): DocMetadataBase;
export declare function addDocNavigation(docsBase: DocMetadataBase[], sidebarsUtils: SidebarsUtils, sidebarFilePath: string): LoadedVersion['docs'];
/**
 * The "main doc" is the "version entry point"
 * We browse this doc by clicking on a version:
 * - the "home" doc (at '/docs/')
 * - the first doc of the first sidebar
 * - a random doc (if no docs are in any sidebar... edge case)
 */
export declare function getMainDocId({ docs, sidebarsUtils, }: {
    docs: DocMetadataBase[];
    sidebarsUtils: SidebarsUtils;
}): string;
export declare function isConventionalDocIndex(doc: {
    source: DocMetadataBase['slug'];
    sourceDirName: DocMetadataBase['sourceDirName'];
}): boolean;
export declare function getDocIds(doc: DocMetadataBase): [string, string];
export declare function createDocsByIdIndex<Doc extends {
    id: string;
    unversionedId: string;
}>(docs: Doc[]): Record<string, Doc>;
export {};
