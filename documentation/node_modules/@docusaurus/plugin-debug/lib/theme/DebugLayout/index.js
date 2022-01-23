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
const Head_1 = (0, tslib_1.__importDefault)(require("@docusaurus/Head"));
const Link_1 = (0, tslib_1.__importDefault)(require("@docusaurus/Link"));
const styles_module_css_1 = (0, tslib_1.__importDefault)(require("./styles.module.css"));
function DebugNavLink({ to, children }) {
    return (react_1.default.createElement(Link_1.default, { className: styles_module_css_1.default.navlink, isNavLink: true, to: to, exact: true, activeStyle: {
            backgroundColor: '#363739',
        } }, children));
}
function DebugLayout({ children }) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Head_1.default, null,
            react_1.default.createElement("html", { lang: "en" }),
            react_1.default.createElement("title", null, "Docusaurus debug panel")),
        react_1.default.createElement("div", null,
            react_1.default.createElement("nav", { className: styles_module_css_1.default.nav },
                react_1.default.createElement(DebugNavLink, { to: "/__docusaurus/debug" }, "Config"),
                react_1.default.createElement(DebugNavLink, { to: "/__docusaurus/debug/metadata" }, "Metadata"),
                react_1.default.createElement(DebugNavLink, { to: "/__docusaurus/debug/registry" }, "Registry"),
                react_1.default.createElement(DebugNavLink, { to: "/__docusaurus/debug/routes" }, "Routes"),
                react_1.default.createElement(DebugNavLink, { to: "/__docusaurus/debug/content" }, "Content"),
                react_1.default.createElement(DebugNavLink, { to: "/__docusaurus/debug/globalData" }, "Global data")),
            react_1.default.createElement("main", { className: styles_module_css_1.default.container }, children))));
}
exports.default = DebugLayout;
