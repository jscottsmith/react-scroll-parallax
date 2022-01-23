import { FunctionComponent } from 'react';
import { CombinedDataset, Selection } from './types';
export interface ExplorerProps {
    isLoading: boolean;
    isBrowsing: boolean;
    dataset: CombinedDataset;
    selected: Selection;
}
export declare const Explorer: FunctionComponent<ExplorerProps>;
