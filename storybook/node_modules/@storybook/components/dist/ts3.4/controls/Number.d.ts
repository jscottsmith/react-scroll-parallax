import { FC } from 'react';
import { ControlProps, NumberValue, NumberConfig } from './types';
declare type NumberProps = ControlProps<NumberValue | null> & NumberConfig;
export declare const parse: (value: string) => number;
export declare const format: (value: NumberValue) => string;
export declare const NumberControl: FC<NumberProps>;
export {};
