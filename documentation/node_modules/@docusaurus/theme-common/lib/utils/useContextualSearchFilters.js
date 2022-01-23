/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useAllDocsData, useActivePluginAndVersion } from '@theme/hooks/useDocs';
import { useDocsPreferredVersionByPluginId } from './docsPreferredVersion/useDocsPreferredVersion';
import { docVersionSearchTag, DEFAULT_SEARCH_TAG } from './searchUtils';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// We may want to support multiple search engines, don't couple that to Algolia/DocSearch
// Maybe users will want to use its own search engine solution
export function useContextualSearchFilters() {
    const { i18n } = useDocusaurusContext();
    const allDocsData = useAllDocsData();
    const activePluginAndVersion = useActivePluginAndVersion();
    const docsPreferredVersionByPluginId = useDocsPreferredVersionByPluginId();
    function getDocPluginTags(pluginId) {
        var _a, _b;
        const activeVersion = ((_a = activePluginAndVersion === null || activePluginAndVersion === void 0 ? void 0 : activePluginAndVersion.activePlugin) === null || _a === void 0 ? void 0 : _a.pluginId) === pluginId
            ? activePluginAndVersion.activeVersion
            : undefined;
        const preferredVersion = docsPreferredVersionByPluginId[pluginId];
        const latestVersion = allDocsData[pluginId].versions.find((v) => v.isLast);
        const version = (_b = activeVersion !== null && activeVersion !== void 0 ? activeVersion : preferredVersion) !== null && _b !== void 0 ? _b : latestVersion;
        return docVersionSearchTag(pluginId, version.name);
    }
    const tags = [
        DEFAULT_SEARCH_TAG,
        ...Object.keys(allDocsData).map(getDocPluginTags),
    ];
    return {
        locale: i18n.currentLocale,
        tags,
    };
}
//# sourceMappingURL=useContextualSearchFilters.js.map