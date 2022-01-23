/// <reference types="react" />
import { StoriesHash, State } from '@storybook/api';
import { ControllerStateAndHelpers } from 'downshift';
export declare type Refs = State['refs'];
export declare type RefType = Refs[keyof Refs];
export declare type Item = StoriesHash[keyof StoriesHash];
export declare type Dataset = Record<string, Item>;
export interface CombinedDataset {
    hash: Refs;
    entries: [
        string,
        RefType
    ][];
}
export interface ItemRef {
    itemId: string;
    refId: string;
}
export interface StoryRef {
    storyId: string;
    refId: string;
}
export declare type Highlight = ItemRef | null;
export declare type Selection = StoryRef | null;
export interface Match {
    value: string;
    indices: [
        number,
        number
    ][];
    key: 'name' | 'path';
    arrayIndex: number;
}
export declare function isCloseType(x: any): x is CloseType;
export declare function isClearType(x: any): x is ClearType;
export declare function isExpandType(x: any): x is ExpandType;
export declare function isSearchResult(x: any): x is SearchResult;
export interface CloseType {
    closeMenu: () => void;
}
export interface ClearType {
    clearLastViewed: () => void;
}
export interface ExpandType {
    showAll: () => void;
    totalCount: number;
    moreCount: number;
}
export declare type SearchItem = Item & {
    refId: string;
    path: string[];
};
export declare type SearchResult = Fuse.FuseResultWithMatches<SearchItem> & Fuse.FuseResultWithScore<SearchItem>;
export declare type DownshiftItem = SearchResult | ExpandType | ClearType | CloseType;
export declare type SearchChildrenFn = (args: {
    query: string;
    results: DownshiftItem[];
    isBrowsing: boolean;
    closeMenu: (cb?: () => void) => void;
    getMenuProps: ControllerStateAndHelpers<DownshiftItem>['getMenuProps'];
    getItemProps: ControllerStateAndHelpers<DownshiftItem>['getItemProps'];
    highlightedIndex: number | null;
}) => React.ReactNode;
