/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { LoadedContent } from './types';
import type { TranslationFile, TranslationFiles } from '@docusaurus/types';
export declare function getLoadedContentTranslationFiles(loadedContent: LoadedContent): TranslationFiles;
export declare function translateLoadedContent(loadedContent: LoadedContent, translationFiles: TranslationFile[]): LoadedContent;
