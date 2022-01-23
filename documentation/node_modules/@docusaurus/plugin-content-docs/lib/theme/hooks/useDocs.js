"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDocVersionSuggestions = exports.useActiveDocContext = exports.useActiveVersion = exports.useLatestVersion = exports.useVersions = exports.useActivePluginAndVersion = exports.useActivePlugin = exports.useDocsData = exports.useAllDocsData = void 0;
const tslib_1 = require("tslib");
const router_1 = require("@docusaurus/router");
const useGlobalData_1 = (0, tslib_1.__importStar)(require("@docusaurus/useGlobalData"));
const docsClientUtils_1 = require("../../client/docsClientUtils");
// Important to use a constant object to avoid React useEffect executions etc...,
// see https://github.com/facebook/docusaurus/issues/5089
const StableEmptyObject = {};
// Not using useAllPluginInstancesData() because in blog-only mode, docs hooks are still used by the theme
// We need a fail-safe fallback when the docs plugin is not in use
const useAllDocsData = () => { var _a; 
// useAllPluginInstancesData('docusaurus-plugin-content-docs');
return (_a = (0, useGlobalData_1.default)()['docusaurus-plugin-content-docs']) !== null && _a !== void 0 ? _a : StableEmptyObject; };
exports.useAllDocsData = useAllDocsData;
const useDocsData = (pluginId) => (0, useGlobalData_1.usePluginData)('docusaurus-plugin-content-docs', pluginId);
exports.useDocsData = useDocsData;
const useActivePlugin = (options = {}) => {
    const data = (0, exports.useAllDocsData)();
    const { pathname } = (0, router_1.useLocation)();
    return (0, docsClientUtils_1.getActivePlugin)(data, pathname, options);
};
exports.useActivePlugin = useActivePlugin;
const useActivePluginAndVersion = (options = {}) => {
    const activePlugin = (0, exports.useActivePlugin)(options);
    const { pathname } = (0, router_1.useLocation)();
    if (activePlugin) {
        const activeVersion = (0, docsClientUtils_1.getActiveVersion)(activePlugin.pluginData, pathname);
        return {
            activePlugin,
            activeVersion,
        };
    }
    return undefined;
};
exports.useActivePluginAndVersion = useActivePluginAndVersion;
// versions are returned ordered (most recent first)
const useVersions = (pluginId) => {
    const data = (0, exports.useDocsData)(pluginId);
    return data.versions;
};
exports.useVersions = useVersions;
const useLatestVersion = (pluginId) => {
    const data = (0, exports.useDocsData)(pluginId);
    return (0, docsClientUtils_1.getLatestVersion)(data);
};
exports.useLatestVersion = useLatestVersion;
// Note: return undefined on doc-unrelated pages,
// because there's no version currently considered as active
const useActiveVersion = (pluginId) => {
    const data = (0, exports.useDocsData)(pluginId);
    const { pathname } = (0, router_1.useLocation)();
    return (0, docsClientUtils_1.getActiveVersion)(data, pathname);
};
exports.useActiveVersion = useActiveVersion;
const useActiveDocContext = (pluginId) => {
    const data = (0, exports.useDocsData)(pluginId);
    const { pathname } = (0, router_1.useLocation)();
    return (0, docsClientUtils_1.getActiveDocContext)(data, pathname);
};
exports.useActiveDocContext = useActiveDocContext;
// Useful to say "hey, you are not on the latest docs version, please switch"
const useDocVersionSuggestions = (pluginId) => {
    const data = (0, exports.useDocsData)(pluginId);
    const { pathname } = (0, router_1.useLocation)();
    return (0, docsClientUtils_1.getDocVersionSuggestions)(data, pathname);
};
exports.useDocVersionSuggestions = useDocVersionSuggestions;
