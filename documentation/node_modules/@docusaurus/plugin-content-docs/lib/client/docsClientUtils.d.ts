/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { GlobalPluginData, GlobalVersion, GlobalDoc } from '../types';
declare type Version = GlobalVersion;
declare type Doc = GlobalDoc;
export declare type ActivePlugin = {
    pluginId: string;
    pluginData: GlobalPluginData;
};
export declare type GetActivePluginOptions = {
    failfast?: boolean;
};
export declare function getActivePlugin(allPluginDatas: Record<string, GlobalPluginData>, pathname: string, options?: GetActivePluginOptions): ActivePlugin | undefined;
export declare type ActiveDocContext = {
    activeVersion?: Version;
    activeDoc?: Doc;
    alternateDocVersions: Record<string, Doc>;
};
export declare const getLatestVersion: (data: GlobalPluginData) => Version;
export declare const getActiveVersion: (data: GlobalPluginData, pathname: string) => Version | undefined;
export declare const getActiveDocContext: (data: GlobalPluginData, pathname: string) => ActiveDocContext;
export declare type DocVersionSuggestions = {
    latestVersionSuggestion: GlobalVersion;
    latestDocSuggestion?: GlobalDoc;
};
export declare const getDocVersionSuggestions: (data: GlobalPluginData, pathname: string) => DocVersionSuggestions;
export {};
