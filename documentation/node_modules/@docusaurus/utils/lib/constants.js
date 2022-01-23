"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WEBPACK_URL_LOADER_LIMIT = exports.DEFAULT_PLUGIN_ID = exports.DEFAULT_PORT = exports.THEME_PATH = exports.OUTPUT_STATIC_ASSETS_DIR_NAME = exports.STATIC_DIR_NAME = exports.SRC_DIR_NAME = exports.GENERATED_FILES_DIR_NAME = exports.BABEL_CONFIG_FILE_NAME = exports.DEFAULT_CONFIG_FILE_NAME = exports.DEFAULT_BUILD_DIR_NAME = exports.NODE_MINOR_VERSION = exports.NODE_MAJOR_VERSION = void 0;
exports.NODE_MAJOR_VERSION = parseInt(process.versions.node.split('.')[0], 10);
exports.NODE_MINOR_VERSION = parseInt(process.versions.node.split('.')[1], 10);
// Can be overridden with cli option --out-dir
exports.DEFAULT_BUILD_DIR_NAME = 'build';
// Can be overridden with cli option --config
exports.DEFAULT_CONFIG_FILE_NAME = 'docusaurus.config.js';
exports.BABEL_CONFIG_FILE_NAME = process.env.DOCUSAURUS_BABEL_CONFIG_FILE_NAME || 'babel.config.js';
exports.GENERATED_FILES_DIR_NAME = process.env.DOCUSAURUS_GENERATED_FILES_DIR_NAME || '.docusaurus';
exports.SRC_DIR_NAME = 'src';
exports.STATIC_DIR_NAME = 'static';
exports.OUTPUT_STATIC_ASSETS_DIR_NAME = 'assets'; // files handled by webpack, hashed (can be cached aggressively)
exports.THEME_PATH = `${exports.SRC_DIR_NAME}/theme`;
exports.DEFAULT_PORT = 3000;
exports.DEFAULT_PLUGIN_ID = 'default';
// Temporary fix for https://github.com/facebook/docusaurus/issues/5493
exports.WEBPACK_URL_LOADER_LIMIT = (_a = process.env.WEBPACK_URL_LOADER_LIMIT) !== null && _a !== void 0 ? _a : 10000;
//# sourceMappingURL=constants.js.map