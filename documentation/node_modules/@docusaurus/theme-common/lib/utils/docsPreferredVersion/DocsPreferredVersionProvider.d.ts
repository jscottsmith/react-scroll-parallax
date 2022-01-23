/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="react" />
declare type DocsPreferredVersionName = string | null;
declare type DocsPreferredVersionPluginState = {
    preferredVersionName: DocsPreferredVersionName;
};
declare type DocsPreferredVersionState = Record<string, DocsPreferredVersionPluginState>;
declare function useContextValue(): readonly [DocsPreferredVersionState, {
    savePreferredVersion: (pluginId: string, versionName: string) => void;
}];
declare type DocsPreferredVersionContextValue = ReturnType<typeof useContextValue>;
export declare function DocsPreferredVersionContextProvider({ children, }: {
    children: JSX.Element;
}): JSX.Element;
export declare function useDocsPreferredVersionContext(): DocsPreferredVersionContextValue;
export {};
//# sourceMappingURL=DocsPreferredVersionProvider.d.ts.map