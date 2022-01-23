/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { GlobalPluginData, GlobalVersion } from '../../types';
import { ActivePlugin, ActiveDocContext, DocVersionSuggestions, GetActivePluginOptions } from '../../client/docsClientUtils';
export declare const useAllDocsData: () => Record<string, GlobalPluginData>;
export declare const useDocsData: (pluginId: string | undefined) => GlobalPluginData;
export declare const useActivePlugin: (options?: GetActivePluginOptions) => ActivePlugin | undefined;
export declare const useActivePluginAndVersion: (options?: GetActivePluginOptions) => {
    activePlugin: ActivePlugin;
    activeVersion: GlobalVersion | undefined;
} | undefined;
export declare const useVersions: (pluginId: string | undefined) => GlobalVersion[];
export declare const useLatestVersion: (pluginId: string | undefined) => GlobalVersion;
export declare const useActiveVersion: (pluginId: string | undefined) => GlobalVersion | undefined;
export declare const useActiveDocContext: (pluginId: string | undefined) => ActiveDocContext;
export declare const useDocVersionSuggestions: (pluginId: string | undefined) => DocVersionSuggestions;
