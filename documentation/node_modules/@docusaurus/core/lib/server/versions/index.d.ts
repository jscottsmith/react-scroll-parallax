/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { DocusaurusPluginVersionInformation } from '@docusaurus/types';
export declare function getPackageJsonVersion(packageJsonPath: string): string | undefined;
export declare function getPackageJsonName(packageJsonPath: string): string | undefined;
export declare function getPluginVersion(pluginPath: string, siteDir: string): DocusaurusPluginVersionInformation;
