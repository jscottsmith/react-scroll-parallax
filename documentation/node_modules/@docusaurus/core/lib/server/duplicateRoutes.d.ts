/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReportingSeverity, RouteConfig } from '@docusaurus/types';
export declare function getAllDuplicateRoutes(pluginsRouteConfigs: RouteConfig[]): string[];
export declare function getDuplicateRoutesMessage(allDuplicateRoutes: string[]): string;
export declare function handleDuplicateRoutes(pluginsRouteConfigs: RouteConfig[], onDuplicateRoutes: ReportingSeverity): void;
