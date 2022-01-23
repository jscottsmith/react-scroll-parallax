"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPluginVersion = exports.getPackageJsonName = exports.getPackageJsonVersion = void 0;
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
function getPackageJsonVersion(packageJsonPath) {
    if ((0, fs_extra_1.existsSync)(packageJsonPath)) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-dynamic-require, global-require
        const { version } = require(packageJsonPath);
        return typeof version === 'string' ? version : undefined;
    }
    return undefined;
}
exports.getPackageJsonVersion = getPackageJsonVersion;
function getPackageJsonName(packageJsonPath) {
    if ((0, fs_extra_1.existsSync)(packageJsonPath)) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-dynamic-require, global-require
        const { name } = require(packageJsonPath);
        return typeof name === 'string' ? name : undefined;
    }
    return undefined;
}
exports.getPackageJsonName = getPackageJsonName;
function getPluginVersion(pluginPath, siteDir) {
    let potentialPluginPackageJsonDirectory = (0, path_1.dirname)(pluginPath);
    while (potentialPluginPackageJsonDirectory !== '/') {
        const packageJsonPath = (0, path_1.join)(potentialPluginPackageJsonDirectory, 'package.json');
        if ((0, fs_extra_1.existsSync)(packageJsonPath) && (0, fs_extra_1.lstatSync)(packageJsonPath).isFile()) {
            if (potentialPluginPackageJsonDirectory === siteDir) {
                // If the plugin belongs to the same docusaurus project, we classify it as local plugin.
                return { type: 'project' };
            }
            return {
                type: 'package',
                name: getPackageJsonName(packageJsonPath),
                version: getPackageJsonVersion(packageJsonPath),
            };
        }
        potentialPluginPackageJsonDirectory = (0, path_1.dirname)(potentialPluginPackageJsonDirectory);
    }
    // In rare cases where a plugin is a path where no parent directory contains package.json, we can only classify it as local.
    return { type: 'local' };
}
exports.getPluginVersion = getPluginVersion;
