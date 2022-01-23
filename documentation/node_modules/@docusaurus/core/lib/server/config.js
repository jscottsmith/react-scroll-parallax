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
const import_fresh_1 = (0, tslib_1.__importDefault)(require("import-fresh"));
const configValidation_1 = require("./configValidation");
function loadConfig(configPath) {
    if (!fs_extra_1.default.existsSync(configPath)) {
        throw new Error(`Config file at "${configPath}" not found.`);
    }
    const loadedConfig = (0, import_fresh_1.default)(configPath);
    return (0, configValidation_1.validateConfig)(loadedConfig);
}
exports.default = loadConfig;
