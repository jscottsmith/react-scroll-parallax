"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_extra_1 = (0, tslib_1.__importDefault)(require("fs-extra"));
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const logger_1 = (0, tslib_1.__importDefault)(require("@docusaurus/logger"));
const utils_1 = require("@docusaurus/utils");
async function removePath(fsPath) {
    try {
        fs_extra_1.default.remove(path_1.default.join(fsPath));
        logger_1.default.success `Removed the path=${fsPath} directory.`;
    }
    catch (e) {
        logger_1.default.error `Could not remove path=${fsPath} directory.
${e}`;
    }
}
async function clear(siteDir) {
    return Promise.all([
        removePath(path_1.default.join(siteDir, utils_1.GENERATED_FILES_DIR_NAME)),
        removePath(path_1.default.join(siteDir, utils_1.DEFAULT_BUILD_DIR_NAME)),
        removePath(path_1.default.join(siteDir, 'node_modules', '.cache')),
    ]);
}
exports.default = clear;
