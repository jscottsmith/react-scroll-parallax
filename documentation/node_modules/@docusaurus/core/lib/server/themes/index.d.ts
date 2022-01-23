/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ThemeAliases, LoadedPlugin } from '@docusaurus/types';
export declare function loadThemeAliases(themePaths: string[], userThemePaths: string[]): ThemeAliases;
export declare function loadPluginsThemeAliases({ siteDir, plugins, }: {
    siteDir: string;
    plugins: LoadedPlugin[];
}): ThemeAliases;
