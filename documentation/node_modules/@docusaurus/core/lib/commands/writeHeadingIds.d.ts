/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Slugger } from '@docusaurus/utils';
declare type Options = {
    maintainCase?: boolean;
    overwrite?: boolean;
};
export declare function transformMarkdownHeadingLine(line: string, slugger: Slugger, options?: Options): string;
export declare function transformMarkdownContent(content: string, options?: Options): string;
export default function writeHeadingIds(siteDir: string, files?: string, options?: Options): Promise<void>;
export {};
