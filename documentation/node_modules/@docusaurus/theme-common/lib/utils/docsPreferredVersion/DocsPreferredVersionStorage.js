/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { createStorageSlot } from '../storageUtils';
const storageKey = (pluginId) => `docs-preferred-version-${pluginId}`;
const DocsPreferredVersionStorage = {
    save: (pluginId, persistence, versionName) => {
        createStorageSlot(storageKey(pluginId), { persistence }).set(versionName);
    },
    read: (pluginId, persistence) => createStorageSlot(storageKey(pluginId), { persistence }).get(),
    clear: (pluginId, persistence) => {
        createStorageSlot(storageKey(pluginId), { persistence }).del();
    },
};
export default DocsPreferredVersionStorage;
//# sourceMappingURL=DocsPreferredVersionStorage.js.map