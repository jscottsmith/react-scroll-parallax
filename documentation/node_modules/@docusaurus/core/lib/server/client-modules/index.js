"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function loadClientModules(plugins) {
    return plugins.flatMap((plugin) => { var _a, _b; return (_b = (_a = plugin.getClientModules) === null || _a === void 0 ? void 0 : _a.call(plugin)) !== null && _b !== void 0 ? _b : []; });
}
exports.default = loadClientModules;
