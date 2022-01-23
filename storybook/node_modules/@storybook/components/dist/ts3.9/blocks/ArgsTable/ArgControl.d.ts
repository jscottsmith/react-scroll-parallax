import { FC } from 'react';
import { Args, ArgType } from './types';
export interface ArgControlProps {
    row: ArgType;
    arg: any;
    updateArgs: (args: Args) => void;
}
export declare const ArgControl: FC<ArgControlProps>;
