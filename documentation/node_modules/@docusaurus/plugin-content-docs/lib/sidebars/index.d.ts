/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { SidebarsConfig, Sidebars, NormalizedSidebars } from './types';
import type { NormalizeSidebarsParams, PluginOptions } from '../types';
import { SidebarProcessorParams } from './processor';
export declare const DefaultSidebars: SidebarsConfig;
export declare const DisabledSidebars: SidebarsConfig;
export declare function resolveSidebarPathOption(siteDir: string, sidebarPathOption: PluginOptions['sidebarPath']): PluginOptions['sidebarPath'];
export declare function loadSidebarsFile(sidebarFilePath: string | false | undefined): SidebarsConfig;
export declare function loadNormalizedSidebars(sidebarFilePath: string | false | undefined, params: NormalizeSidebarsParams): NormalizedSidebars;
export declare function loadSidebars(sidebarFilePath: string | false | undefined, options: SidebarProcessorParams): Promise<Sidebars>;
