/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LoadContext, PluginConfig, RouteConfig, ThemeConfig, LoadedPlugin } from '@docusaurus/types';
export declare function sortConfig(routeConfigs: RouteConfig[], baseUrl?: string): void;
export declare function loadPlugins({ pluginConfigs, context, }: {
    pluginConfigs: PluginConfig[];
    context: LoadContext;
}): Promise<{
    plugins: LoadedPlugin[];
    pluginsRouteConfigs: RouteConfig[];
    globalData: unknown;
    themeConfigTranslated: ThemeConfig;
}>;
