"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortAliases = void 0;
const tslib_1 = require("tslib");
const fs_extra_1 = (0, tslib_1.__importDefault)(require("fs-extra"));
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const utils_1 = require("@docusaurus/utils");
const lodash_1 = require("lodash");
// Order of Webpack aliases is important because one alias can shadow another
// This ensure @theme/NavbarItem alias is after @theme/NavbarItem/LocaleDropdown
// See https://github.com/facebook/docusaurus/pull/3922
// See https://github.com/facebook/docusaurus/issues/5382
function sortAliases(aliases) {
    // Alphabetical order by default
    const entries = (0, lodash_1.sortBy)(Object.entries(aliases), ([alias]) => alias);
    // @theme/NavbarItem should be after @theme/NavbarItem/LocaleDropdown
    entries.sort(([alias1], [alias2]) => alias1.includes(`${alias2}/`) ? -1 : 0);
    return Object.fromEntries(entries);
}
exports.sortAliases = sortAliases;
// TODO make async
function themeAlias(themePath, addOriginalAlias) {
    if (!fs_extra_1.default.pathExistsSync(themePath)) {
        return {};
    }
    const themeComponentFiles = utils_1.Globby.sync(['**/*.{js,jsx,ts,tsx}'], {
        cwd: themePath,
    });
    const aliases = {};
    themeComponentFiles.forEach((relativeSource) => {
        const filePath = path_1.default.join(themePath, relativeSource);
        const fileName = (0, utils_1.fileToPath)(relativeSource);
        const aliasName = (0, utils_1.posixPath)((0, utils_1.normalizeUrl)(['@theme', fileName]).replace(/\/$/, ''));
        aliases[aliasName] = filePath;
        if (addOriginalAlias) {
            // For swizzled components to access the original.
            const originalAliasName = (0, utils_1.posixPath)((0, utils_1.normalizeUrl)(['@theme-original', fileName]).replace(/\/$/, ''));
            aliases[originalAliasName] = filePath;
        }
    });
    return sortAliases(aliases);
}
exports.default = themeAlias;
