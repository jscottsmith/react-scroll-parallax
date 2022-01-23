/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useContext, createContext } from 'react';
export const createStatefulLinksCollector = () => {
    // Set to dedup, as it's not useful to collect multiple times the same link
    const allLinks = new Set();
    return {
        collectLink: (link) => {
            allLinks.add(link);
        },
        getCollectedLinks: () => [...allLinks],
    };
};
const Context = createContext({
    collectLink: () => {
        // noop by default for client
        // we only use the broken links checker server-side
    },
});
export const useLinksCollector = () => useContext(Context);
export function ProvideLinksCollector({ children, linksCollector, }) {
    return React.createElement(Context.Provider, { value: linksCollector }, children);
}
