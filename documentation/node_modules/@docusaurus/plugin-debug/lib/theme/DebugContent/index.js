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
function PluginInstanceContent({ pluginId, pluginInstanceContent, }) {
    return (react_1.default.createElement("section", { style: { marginBottom: 30 } },
        react_1.default.createElement("code", null, pluginId),
        react_1.default.createElement(DebugJsonView_1.default, { src: pluginInstanceContent, collapseDepth: 2 })));
}
function PluginContent({ pluginName, pluginContent, }) {
    return (react_1.default.createElement("section", { style: { marginBottom: 60 } },
        react_1.default.createElement("h3", null, pluginName),
        react_1.default.createElement("div", null, Object.entries(pluginContent)
            // filter plugin instances with no content
            .filter(([_pluginId, pluginInstanceContent]) => !!pluginInstanceContent)
            .map(([pluginId, pluginInstanceContent]) => (react_1.default.createElement(PluginInstanceContent, { key: pluginId, pluginId: pluginId, pluginInstanceContent: pluginInstanceContent }))))));
}
function DebugContent({ allContent }) {
    return (react_1.default.createElement(DebugLayout_1.default, null,
        react_1.default.createElement("h2", null, "Plugin content"),
        react_1.default.createElement("div", null, Object.entries(allContent)
            // filter plugins with no content
            .filter(([_pluginName, pluginContent]) => Object.values(pluginContent).some((instanceContent) => !!instanceContent))
            .map(([pluginName, pluginContent]) => (react_1.default.createElement(PluginContent, { key: pluginName, pluginName: pluginName, pluginContent: pluginContent }))))));
}
exports.default = DebugContent;
