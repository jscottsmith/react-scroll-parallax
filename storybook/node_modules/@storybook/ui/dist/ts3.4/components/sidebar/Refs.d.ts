import { FunctionComponent, MutableRefObject } from 'react';
import { Highlight, RefType } from './types';
export interface RefProps {
    isLoading: boolean;
    isBrowsing: boolean;
    selectedStoryId: string | null;
    highlightedRef: MutableRefObject<Highlight>;
    setHighlighted: (highlight: Highlight) => void;
}
export declare const Ref: FunctionComponent<RefType & RefProps>;
