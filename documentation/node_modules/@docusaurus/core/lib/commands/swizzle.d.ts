/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { PluginConfig } from '@docusaurus/types';
export declare function getPluginNames(plugins: PluginConfig[]): string[];
export default function swizzle(siteDir: string, themeName?: string, componentName?: string, typescript?: boolean, danger?: boolean): Promise<void>;
