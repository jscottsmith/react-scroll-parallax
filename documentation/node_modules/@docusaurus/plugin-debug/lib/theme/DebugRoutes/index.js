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
const DebugJsonView_1 = (0, tslib_1.__importDefault)(require("@theme/DebugJsonView"));
const routes_1 = (0, tslib_1.__importDefault)(require("@generated/routes"));
const styles_module_css_1 = (0, tslib_1.__importDefault)(require("./styles.module.css"));
function DebugRoutes() {
    return (react_1.default.createElement(DebugLayout_1.default, null,
        react_1.default.createElement("h2", null, "Routes"),
        react_1.default.createElement("ul", { className: styles_module_css_1.default.list }, routes_1.default.map(({ path, exact, routes: childRoutes }) => (react_1.default.createElement("li", { key: path, className: styles_module_css_1.default.listItem },
            react_1.default.createElement("div", { className: styles_module_css_1.default.route },
                react_1.default.createElement("code", { className: styles_module_css_1.default.routeName }, path)),
            react_1.default.createElement("div", null,
                "Is exact: ",
                react_1.default.createElement("code", null, String(Boolean(exact)))),
            childRoutes && (react_1.default.createElement("div", null,
                "Child Routes:",
                react_1.default.createElement(DebugJsonView_1.default, { src: childRoutes })))))))));
}
exports.default = DebugRoutes;
