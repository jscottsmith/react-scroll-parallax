/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ChunkRegistry, RouteConfig, ChunkNames } from '@docusaurus/types';
declare type LoadedRoutes = {
    registry: {
        [chunkName: string]: ChunkRegistry;
    };
    routesConfig: string;
    routesChunkNames: {
        [routePath: string]: ChunkNames;
    };
    routesPaths: string[];
};
export default function loadRoutes(pluginsRouteConfigs: RouteConfig[], baseUrl: string): Promise<LoadedRoutes>;
export {};
