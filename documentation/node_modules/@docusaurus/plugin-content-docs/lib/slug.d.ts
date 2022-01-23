/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { DocMetadataBase, NumberPrefixParser } from './types';
export default function getSlug({ baseID, frontmatterSlug, source, sourceDirName, stripDirNumberPrefixes, numberPrefixParser, }: {
    baseID: string;
    frontmatterSlug?: string;
    source: DocMetadataBase['slug'];
    sourceDirName: DocMetadataBase['sourceDirName'];
    stripDirNumberPrefixes?: boolean;
    numberPrefixParser?: NumberPrefixParser;
}): string;
