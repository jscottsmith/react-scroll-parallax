/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactNode } from 'react';
import { PropSidebar, PropSidebarItem, PropSidebarItemCategory, PropVersionDoc, PropVersionMetadata } from '@docusaurus/plugin-content-docs';
export declare const isDocsPluginEnabled: boolean;
declare const EmptyContextValue: unique symbol;
export declare function DocsVersionProvider({ children, version, }: {
    children: ReactNode;
    version: PropVersionMetadata | typeof EmptyContextValue;
}): JSX.Element;
export declare function useDocsVersion(): PropVersionMetadata;
export declare function useDocById(id: string): PropVersionDoc;
export declare function useDocById(id: string | undefined): PropVersionDoc | undefined;
export declare function DocsSidebarProvider({ children, sidebar, }: {
    children: ReactNode;
    sidebar: PropSidebar | null;
}): JSX.Element;
export declare function useDocsSidebar(): PropSidebar | null;
export declare function findSidebarCategory(sidebar: PropSidebar, predicate: (category: PropSidebarItemCategory) => boolean): PropSidebarItemCategory | undefined;
export declare function findFirstCategoryLink(item: PropSidebarItemCategory): string | undefined;
export declare function useCurrentSidebarCategory(): PropSidebarItemCategory;
export declare function isActiveSidebarItem(item: PropSidebarItem, activePath: string): boolean;
export {};
//# sourceMappingURL=docsUtils.d.ts.map