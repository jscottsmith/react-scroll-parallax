import { FunctionComponent } from 'react';
import { ControllerStateAndHelpers } from 'downshift';
import { DownshiftItem } from './types';
export declare const SearchResults: FunctionComponent<{
    query: string;
    results: DownshiftItem[];
    closeMenu: (cb?: () => void) => void;
    getMenuProps: ControllerStateAndHelpers<DownshiftItem>['getMenuProps'];
    getItemProps: ControllerStateAndHelpers<DownshiftItem>['getItemProps'];
    highlightedIndex: number | null;
    isLoading?: boolean;
    enableShortcuts?: boolean;
}>;
