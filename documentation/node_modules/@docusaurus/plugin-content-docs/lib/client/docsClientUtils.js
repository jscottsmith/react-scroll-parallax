"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocVersionSuggestions = exports.getActiveDocContext = exports.getActiveVersion = exports.getLatestVersion = exports.getActivePlugin = void 0;
const router_1 = require("@docusaurus/router");
// get the data of the plugin that is currently "active"
// ie the docs of that plugin are currently browsed
// it is useful to support multiple docs plugin instances
function getActivePlugin(allPluginDatas, pathname, options = {}) {
    const activeEntry = Object.entries(allPluginDatas).find(([_id, pluginData]) => !!(0, router_1.matchPath)(pathname, {
        path: pluginData.path,
        exact: false,
        strict: false,
    }));
    const activePlugin = activeEntry
        ? { pluginId: activeEntry[0], pluginData: activeEntry[1] }
        : undefined;
    if (!activePlugin && options.failfast) {
        throw new Error(`Can't find active docs plugin for "${pathname}" pathname, while it was expected to be found. Maybe you tried to use a docs feature that can only be used on a docs-related page? Existing docs plugin paths are: ${Object.values(allPluginDatas)
            .map((plugin) => plugin.path)
            .join(', ')}`);
    }
    return activePlugin;
}
exports.getActivePlugin = getActivePlugin;
const getLatestVersion = (data) => data.versions.find((version) => version.isLast);
exports.getLatestVersion = getLatestVersion;
// Note: return undefined on doc-unrelated pages,
// because there's no version currently considered as active
const getActiveVersion = (data, pathname) => {
    const lastVersion = (0, exports.getLatestVersion)(data);
    // Last version is a route like /docs/*,
    // we need to try to match it last or it would match /docs/version-1.0/* as well
    const orderedVersionsMetadata = [
        ...data.versions.filter((version) => version !== lastVersion),
        lastVersion,
    ];
    return orderedVersionsMetadata.find((version) => !!(0, router_1.matchPath)(pathname, {
        path: version.path,
        exact: false,
        strict: false,
    }));
};
exports.getActiveVersion = getActiveVersion;
const getActiveDocContext = (data, pathname) => {
    const activeVersion = (0, exports.getActiveVersion)(data, pathname);
    const activeDoc = activeVersion === null || activeVersion === void 0 ? void 0 : activeVersion.docs.find((doc) => !!(0, router_1.matchPath)(pathname, {
        path: doc.path,
        exact: true,
        strict: false,
    }));
    function getAlternateVersionDocs(docId) {
        const result = {};
        data.versions.forEach((version) => {
            version.docs.forEach((doc) => {
                if (doc.id === docId) {
                    result[version.name] = doc;
                }
            });
        });
        return result;
    }
    const alternateVersionDocs = activeDoc
        ? getAlternateVersionDocs(activeDoc.id)
        : {};
    return {
        activeVersion,
        activeDoc,
        alternateDocVersions: alternateVersionDocs,
    };
};
exports.getActiveDocContext = getActiveDocContext;
const getDocVersionSuggestions = (data, pathname) => {
    const latestVersion = (0, exports.getLatestVersion)(data);
    const activeDocContext = (0, exports.getActiveDocContext)(data, pathname);
    const latestDocSuggestion = activeDocContext === null || activeDocContext === void 0 ? void 0 : activeDocContext.alternateDocVersions[latestVersion.name];
    return { latestDocSuggestion, latestVersionSuggestion: latestVersion };
};
exports.getDocVersionSuggestions = getDocVersionSuggestions;
