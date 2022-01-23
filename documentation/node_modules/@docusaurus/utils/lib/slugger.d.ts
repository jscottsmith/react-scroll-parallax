/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export declare type SluggerOptions = {
    maintainCase?: boolean;
};
export declare type Slugger = {
    slug: (value: string, options?: SluggerOptions) => string;
};
export declare function createSlugger(): Slugger;
//# sourceMappingURL=slugger.d.ts.map