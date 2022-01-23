import { FC } from 'react';
import { ControlProps, NumberValue, RangeConfig } from './types';
declare type RangeProps = ControlProps<NumberValue | null> & RangeConfig;
export declare const RangeControl: FC<RangeProps>;
export {};
