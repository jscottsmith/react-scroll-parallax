/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export { default as Globby } from 'globby';
export declare const GlobExcludeDefault: string[];
declare type Matcher = (str: string) => boolean;
export declare function createMatcher(patterns: string[]): Matcher;
export declare function createAbsoluteFilePathMatcher(patterns: string[], rootFolders: string[]): Matcher;
//# sourceMappingURL=globUtils.d.ts.map