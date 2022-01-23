/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export declare const translateTagsPageTitle: () => string;
declare type TagsListItem = Readonly<{
    name: string;
    permalink: string;
    count: number;
}>;
export declare type TagLetterEntry = Readonly<{
    letter: string;
    tags: TagsListItem[];
}>;
export declare function listTagsByLetters(tags: readonly TagsListItem[]): TagLetterEntry[];
export {};
//# sourceMappingURL=tagsUtils.d.ts.map