/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export declare type Tag = {
    label: string;
    permalink: string;
};
export declare type FrontMatterTag = string | Tag;
export declare function normalizeFrontMatterTag(tagsPath: string, frontMatterTag: FrontMatterTag): Tag;
export declare function normalizeFrontMatterTags(tagsPath: string, frontMatterTags: FrontMatterTag[] | undefined): Tag[];
export declare type TaggedItemGroup<Item> = {
    tag: Tag;
    items: Item[];
};
export declare function groupTaggedItems<Item>(items: Item[], getItemTags: (item: Item) => Tag[]): Record<string, TaggedItemGroup<Item>>;
//# sourceMappingURL=tags.d.ts.map