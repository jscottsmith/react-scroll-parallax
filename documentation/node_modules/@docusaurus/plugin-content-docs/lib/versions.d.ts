/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { PluginOptions, VersionMetadata } from './types';
import type { LoadContext } from '@docusaurus/types';
export declare function getVersionedDocsDirPath(siteDir: string, pluginId: string): string;
export declare function getVersionedSidebarsDirPath(siteDir: string, pluginId: string): string;
export declare function getVersionsFilePath(siteDir: string, pluginId: string): string;
export declare function readVersionsMetadata({ context, options, }: {
    context: Pick<LoadContext, 'siteDir' | 'baseUrl' | 'i18n'>;
    options: Pick<PluginOptions, 'id' | 'path' | 'sidebarPath' | 'routeBasePath' | 'tagsBasePath' | 'includeCurrentVersion' | 'disableVersioning' | 'lastVersion' | 'versions' | 'onlyIncludeVersions' | 'editUrl' | 'editCurrentVersion'>;
}): VersionMetadata[];
export declare function getDocsDirPaths(versionMetadata: Pick<VersionMetadata, 'contentPath' | 'contentPathLocalized'>): [string, string];
