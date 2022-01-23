"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const DebugLayout_1 = (0, tslib_1.__importDefault)(require("@theme/DebugLayout"));
const registry_1 = (0, tslib_1.__importDefault)(require("@generated/registry"));
const styles_module_css_1 = (0, tslib_1.__importDefault)(require("./styles.module.css"));
function DebugRegistry() {
    return (react_1.default.createElement(DebugLayout_1.default, null,
        react_1.default.createElement("h2", null, "Registry"),
        react_1.default.createElement("ul", { className: styles_module_css_1.default.list }, Object.values(registry_1.default).map(([, aliasedPath, resolved]) => (react_1.default.createElement("li", { key: aliasedPath, className: styles_module_css_1.default.listItem },
            react_1.default.createElement("div", { style: { marginBottom: '10px' } },
                "Aliased Path: ",
                react_1.default.createElement("code", null, aliasedPath)),
            react_1.default.createElement("div", null,
                "Resolved Path: ",
                react_1.default.createElement("code", null, resolved))))))));
}
exports.default = DebugRegistry;
