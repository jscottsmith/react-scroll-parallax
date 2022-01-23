/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { InjectedHtmlTags, HtmlTags, LoadedPlugin } from '@docusaurus/types';
export declare function createHtmlTagsString(tags: HtmlTags): string;
export declare function loadHtmlTags(plugins: LoadedPlugin[]): InjectedHtmlTags;
