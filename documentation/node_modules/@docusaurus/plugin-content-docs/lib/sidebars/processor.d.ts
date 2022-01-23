/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { NumberPrefixParser, DocMetadataBase, VersionMetadata, SidebarOptions } from '../types';
import type { Sidebars, NormalizedSidebars, SidebarItemsGeneratorOption } from './types';
import { Slugger } from '@docusaurus/utils';
export declare type SidebarProcessorParams = {
    sidebarItemsGenerator: SidebarItemsGeneratorOption;
    numberPrefixParser: NumberPrefixParser;
    docs: DocMetadataBase[];
    version: VersionMetadata;
    categoryLabelSlugger: Slugger;
    sidebarOptions: SidebarOptions;
};
export declare function processSidebars(unprocessedSidebars: NormalizedSidebars, params: SidebarProcessorParams): Promise<Sidebars>;
