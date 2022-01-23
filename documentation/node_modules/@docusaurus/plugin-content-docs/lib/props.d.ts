/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { LoadedVersion, VersionTag, DocMetadata } from './types';
import type { PropSidebars, PropVersionMetadata, PropTagDocList } from '@docusaurus/plugin-content-docs';
export declare function toSidebarsProp(loadedVersion: LoadedVersion): PropSidebars;
export declare function toVersionMetadataProp(pluginId: string, loadedVersion: LoadedVersion): PropVersionMetadata;
export declare function toTagDocListProp({ allTagsPath, tag, docs, }: {
    allTagsPath: string;
    tag: VersionTag;
    docs: Pick<DocMetadata, 'id' | 'title' | 'description' | 'permalink'>[];
}): PropTagDocList;
