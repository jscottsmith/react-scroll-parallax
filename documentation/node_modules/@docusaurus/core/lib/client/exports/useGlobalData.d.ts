/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export default function useGlobalData(): Record<string, unknown>;
export declare function useAllPluginInstancesData<T = unknown>(pluginName: string): Record<string, T>;
export declare function usePluginData<T = unknown>(pluginName: string, pluginId?: string): T;
