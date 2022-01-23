/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { DocMetadata, GlobalDoc, LoadedVersion, GlobalVersion } from './types';
export declare function toGlobalDataDoc(doc: DocMetadata): GlobalDoc;
export declare function toGlobalDataVersion(version: LoadedVersion): GlobalVersion;
