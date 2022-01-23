import { FC } from 'react';
import { ArgType, Args } from './types';
interface ArgRowProps {
    row: ArgType;
    arg: any;
    updateArgs?: (args: Args) => void;
    compact?: boolean;
    expandable?: boolean;
    initialExpandedArgs?: boolean;
}
export declare const ArgRow: FC<ArgRowProps>;
export {};
