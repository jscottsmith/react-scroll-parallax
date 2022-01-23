/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { DocsVersionPersistence } from '../useThemeConfig';
declare const DocsPreferredVersionStorage: {
    save: (pluginId: string, persistence: DocsVersionPersistence, versionName: string) => void;
    read: (pluginId: string, persistence: DocsVersionPersistence) => string | null;
    clear: (pluginId: string, persistence: DocsVersionPersistence) => void;
};
export default DocsPreferredVersionStorage;
//# sourceMappingURL=DocsPreferredVersionStorage.d.ts.map