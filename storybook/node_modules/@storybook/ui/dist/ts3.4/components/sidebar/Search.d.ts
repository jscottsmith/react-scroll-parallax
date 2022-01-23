import React from 'react';
import { CombinedDataset, SearchChildrenFn, Selection } from './types';
export declare const Search: React.NamedExoticComponent<{
    children: SearchChildrenFn;
    dataset: CombinedDataset;
    isLoading?: boolean;
    enableShortcuts?: boolean;
    getLastViewed: () => Selection[];
    clearLastViewed: () => void;
    initialQuery?: string;
}>;
