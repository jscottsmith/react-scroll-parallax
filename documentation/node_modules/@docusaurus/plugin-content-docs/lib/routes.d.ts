/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { PluginContentLoadedActions, RouteConfig } from '@docusaurus/types';
import { DocMetadata, LoadedVersion } from './types';
export declare function createCategoryGeneratedIndexRoutes({ version, actions, docCategoryGeneratedIndexComponent, }: {
    version: LoadedVersion;
    actions: PluginContentLoadedActions;
    docCategoryGeneratedIndexComponent: string;
}): Promise<RouteConfig[]>;
export declare function createDocRoutes({ docs, actions, docItemComponent, }: {
    docs: DocMetadata[];
    actions: PluginContentLoadedActions;
    docItemComponent: string;
}): Promise<RouteConfig[]>;
export declare function createVersionRoutes({ loadedVersion, actions, docItemComponent, docLayoutComponent, docCategoryGeneratedIndexComponent, pluginId, aliasedSource, }: {
    loadedVersion: LoadedVersion;
    actions: PluginContentLoadedActions;
    docLayoutComponent: string;
    docItemComponent: string;
    docCategoryGeneratedIndexComponent: string;
    pluginId: string;
    aliasedSource: (str: string) => string;
}): Promise<void>;
