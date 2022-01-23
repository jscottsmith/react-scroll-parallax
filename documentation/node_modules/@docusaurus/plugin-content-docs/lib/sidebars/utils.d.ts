/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { Sidebars, Sidebar, SidebarItem, SidebarItemCategory, SidebarItemLink, SidebarItemDoc, SidebarCategoriesShorthand, SidebarItemConfig } from './types';
import { DocMetadataBase, DocNavLink } from '../types';
import { SidebarItemCategoryWithGeneratedIndex, SidebarNavigationItem } from './types';
export declare function isCategoriesShorthand(item: SidebarItemConfig): item is SidebarCategoriesShorthand;
export declare function transformSidebarItems(sidebar: Sidebar, updateFn: (item: SidebarItem) => SidebarItem): Sidebar;
export declare function collectSidebarDocItems(sidebar: Sidebar): SidebarItemDoc[];
export declare function collectSidebarCategories(sidebar: Sidebar): SidebarItemCategory[];
export declare function collectSidebarLinks(sidebar: Sidebar): SidebarItemLink[];
export declare function collectSidebarDocIds(sidebar: Sidebar): string[];
export declare function collectSidebarNavigation(sidebar: Sidebar): SidebarNavigationItem[];
export declare function collectSidebarsDocIds(sidebars: Sidebars): Record<string, string[]>;
export declare function collectSidebarsNavigations(sidebars: Sidebars): Record<string, SidebarNavigationItem[]>;
export declare type SidebarNavigation = {
    sidebarName: string | undefined;
    previous: SidebarNavigationItem | undefined;
    next: SidebarNavigationItem | undefined;
};
export declare type SidebarsUtils = {
    sidebars: Sidebars;
    getFirstDocIdOfFirstSidebar: () => string | undefined;
    getSidebarNameByDocId: (docId: string) => string | undefined;
    getDocNavigation: (unversionedId: string, versionedId: string) => SidebarNavigation;
    getCategoryGeneratedIndexList: () => SidebarItemCategoryWithGeneratedIndex[];
    getCategoryGeneratedIndexNavigation: (categoryGeneratedIndexPermalink: string) => SidebarNavigation;
    checkSidebarsDocIds: (validDocIds: string[], sidebarFilePath: string) => void;
};
export declare function createSidebarsUtils(sidebars: Sidebars): SidebarsUtils;
export declare function toDocNavigationLink(doc: DocMetadataBase): DocNavLink;
export declare function toNavigationLink(navigationItem: SidebarNavigationItem | undefined, docsById: Record<string, DocMetadataBase>): DocNavLink | undefined;
