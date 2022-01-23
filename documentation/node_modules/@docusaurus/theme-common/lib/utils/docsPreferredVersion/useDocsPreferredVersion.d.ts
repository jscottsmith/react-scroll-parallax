/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="@docusaurus/plugin-content-docs" />
import { GlobalVersion } from '@theme/hooks/useDocs';
export declare function useDocsPreferredVersion(pluginId?: string | undefined): {
    preferredVersion: GlobalVersion | null | undefined;
    savePreferredVersionName: (versionName: string) => void;
};
export declare function useDocsPreferredVersionByPluginId(): Record<string, GlobalVersion | null | undefined>;
//# sourceMappingURL=useDocsPreferredVersion.d.ts.map