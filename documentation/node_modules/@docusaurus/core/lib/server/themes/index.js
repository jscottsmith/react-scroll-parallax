"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPluginsThemeAliases = exports.loadThemeAliases = void 0;
const tslib_1 = require("tslib");
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const utils_1 = require("@docusaurus/utils");
const alias_1 = (0, tslib_1.__importStar)(require("./alias"));
const ThemeFallbackDir = path_1.default.resolve(__dirname, '../../client/theme-fallback');
function loadThemeAliases(themePaths, userThemePaths) {
    const aliases = {};
    themePaths.forEach((themePath) => {
        const themeAliases = (0, alias_1.default)(themePath, true);
        Object.keys(themeAliases).forEach((aliasKey) => {
            // If this alias shadows a previous one, use @theme-init to preserve the initial one.
            // @theme-init is only applied once: to the initial theme that provided this component
            if (aliasKey in aliases) {
                const componentName = aliasKey.substring(aliasKey.indexOf('/') + 1);
                const initAlias = `@theme-init/${componentName}`;
                if (!(initAlias in aliases)) {
                    aliases[initAlias] = aliases[aliasKey];
                }
            }
            aliases[aliasKey] = themeAliases[aliasKey];
        });
    });
    userThemePaths.forEach((themePath) => {
        const userThemeAliases = (0, alias_1.default)(themePath, false);
        Object.assign(aliases, userThemeAliases);
    });
    return (0, alias_1.sortAliases)(aliases);
}
exports.loadThemeAliases = loadThemeAliases;
function loadPluginsThemeAliases({ siteDir, plugins, }) {
    const pluginThemes = plugins
        .map((plugin) => (plugin.getThemePath ? plugin.getThemePath() : undefined))
        .filter((x) => Boolean(x));
    const userTheme = path_1.default.resolve(siteDir, utils_1.THEME_PATH);
    return loadThemeAliases([ThemeFallbackDir, ...pluginThemes], [userTheme]);
}
exports.loadPluginsThemeAliases = loadPluginsThemeAliases;
