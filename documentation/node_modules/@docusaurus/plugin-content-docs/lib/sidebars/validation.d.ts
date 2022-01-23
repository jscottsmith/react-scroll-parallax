/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { SidebarsConfig } from './types';
import { CategoryMetadataFile } from './generator';
export declare function validateSidebars(sidebars: unknown): asserts sidebars is SidebarsConfig;
export declare function validateCategoryMetadataFile(unsafeContent: unknown): CategoryMetadataFile;
