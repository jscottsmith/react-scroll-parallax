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
const useDocusaurusContext_1 = (0, tslib_1.__importDefault)(require("@docusaurus/useDocusaurusContext"));
const styles_module_css_1 = (0, tslib_1.__importDefault)(require("./styles.module.css"));
function DebugMetadata() {
    const { siteMetadata } = (0, useDocusaurusContext_1.default)();
    return (react_1.default.createElement(DebugLayout_1.default, null,
        react_1.default.createElement("h2", null, "Site Metadata"),
        react_1.default.createElement("div", null,
            "Docusaurus Version: ",
            react_1.default.createElement("code", null, siteMetadata.docusaurusVersion)),
        react_1.default.createElement("div", null,
            "Site Version:",
            ' ',
            react_1.default.createElement("code", null, siteMetadata.siteVersion || 'No version specified')),
        react_1.default.createElement("h3", { className: styles_module_css_1.default.sectionTitle }, "Plugins and themes"),
        react_1.default.createElement("ul", { className: styles_module_css_1.default.list }, Object.entries(siteMetadata.pluginVersions).map(([name, versionInformation]) => (react_1.default.createElement("li", { key: name, className: styles_module_css_1.default.listItem },
            versionInformation.type === 'package' &&
                versionInformation.version && (react_1.default.createElement("div", { className: styles_module_css_1.default.version },
                react_1.default.createElement("code", null, versionInformation.version))),
            react_1.default.createElement("div", { className: styles_module_css_1.default.name }, name),
            react_1.default.createElement("div", null,
                "Type: ",
                versionInformation.type)))))));
}
exports.default = DebugMetadata;
