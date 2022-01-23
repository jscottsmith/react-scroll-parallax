/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { createContext, useContext, useEffect, useMemo, useState, } from 'react';
import { useThemeConfig } from '../useThemeConfig';
import { isDocsPluginEnabled } from '../docsUtils';
import { useAllDocsData } from '@theme/hooks/useDocs';
import DocsPreferredVersionStorage from './DocsPreferredVersionStorage';
// Initial state is always null as we can't read localstorage from node SSR
function getInitialState(pluginIds) {
    const initialState = {};
    pluginIds.forEach((pluginId) => {
        initialState[pluginId] = {
            preferredVersionName: null,
        };
    });
    return initialState;
}
// Read storage for all docs plugins
// Assign to each doc plugin a preferred version (if found)
function readStorageState({ pluginIds, versionPersistence, allDocsData, }) {
    // The storage value we read might be stale,
    // and belong to a version that does not exist in the site anymore
    // In such case, we remove the storage value to avoid downstream errors
    function restorePluginState(pluginId) {
        const preferredVersionNameUnsafe = DocsPreferredVersionStorage.read(pluginId, versionPersistence);
        const pluginData = allDocsData[pluginId];
        const versionExists = pluginData.versions.some((version) => version.name === preferredVersionNameUnsafe);
        if (versionExists) {
            return { preferredVersionName: preferredVersionNameUnsafe };
        }
        else {
            DocsPreferredVersionStorage.clear(pluginId, versionPersistence);
            return { preferredVersionName: null };
        }
    }
    const initialState = {};
    pluginIds.forEach((pluginId) => {
        initialState[pluginId] = restorePluginState(pluginId);
    });
    return initialState;
}
function useVersionPersistence() {
    return useThemeConfig().docs.versionPersistence;
}
// Value that  will be accessible through context: [state,api]
function useContextValue() {
    const allDocsData = useAllDocsData();
    const versionPersistence = useVersionPersistence();
    const pluginIds = useMemo(() => Object.keys(allDocsData), [allDocsData]);
    // Initial state is empty, as  we can't read browser storage in node/SSR
    const [state, setState] = useState(() => getInitialState(pluginIds));
    // On mount, we set the state read from browser storage
    useEffect(() => {
        setState(readStorageState({ allDocsData, versionPersistence, pluginIds }));
    }, [allDocsData, versionPersistence, pluginIds]);
    // The API that we expose to consumer hooks (memo for constant object)
    const api = useMemo(() => {
        function savePreferredVersion(pluginId, versionName) {
            DocsPreferredVersionStorage.save(pluginId, versionPersistence, versionName);
            setState((s) => ({
                ...s,
                [pluginId]: { preferredVersionName: versionName },
            }));
        }
        return {
            savePreferredVersion,
        };
    }, [versionPersistence]);
    return [state, api];
}
const Context = createContext(null);
export function DocsPreferredVersionContextProvider({ children, }) {
    if (isDocsPluginEnabled) {
        return (React.createElement(DocsPreferredVersionContextProviderUnsafe, null, children));
    }
    else {
        return children;
    }
}
function DocsPreferredVersionContextProviderUnsafe({ children, }) {
    const contextValue = useContextValue();
    return React.createElement(Context.Provider, { value: contextValue }, children);
}
export function useDocsPreferredVersionContext() {
    const value = useContext(Context);
    if (!value) {
        throw new Error('Can\'t find docs preferred context, maybe you forgot to use the "DocsPreferredVersionContextProvider"?');
    }
    return value;
}
//# sourceMappingURL=DocsPreferredVersionProvider.js.map