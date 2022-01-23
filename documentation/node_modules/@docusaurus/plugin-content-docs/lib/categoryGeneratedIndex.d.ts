/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CategoryGeneratedIndexMetadata, DocMetadataBase } from './types';
import { SidebarsUtils } from './sidebars/utils';
export declare function getCategoryGeneratedIndexMetadataList({ docs, sidebarsUtils, }: {
    sidebarsUtils: SidebarsUtils;
    docs: DocMetadataBase[];
}): CategoryGeneratedIndexMetadata[];
