import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { CombinedDataset, Highlight, Selection } from './types';
export interface HighlightedProps {
    containerRef: MutableRefObject<HTMLElement>;
    isLoading: boolean;
    isBrowsing: boolean;
    dataset: CombinedDataset;
    selected: Selection;
}
export declare const useHighlighted: ({ containerRef, isLoading, isBrowsing, dataset, selected, }: HighlightedProps) => [
    Highlight,
    Dispatch<SetStateAction<Highlight>>,
    MutableRefObject<Highlight>
];
