/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { SidebarItemsGenerator, SidebarItemCategoryLinkConfig } from './types';
export declare const CategoryMetadataFilenameBase = "_category_";
export declare const CategoryMetadataFilenamePattern = "_category_.{json,yml,yaml}";
export declare type CategoryMetadataFile = {
    label?: string;
    position?: number;
    collapsed?: boolean;
    collapsible?: boolean;
    className?: string;
    link?: SidebarItemCategoryLinkConfig;
};
export declare const DefaultSidebarItemsGenerator: SidebarItemsGenerator;
