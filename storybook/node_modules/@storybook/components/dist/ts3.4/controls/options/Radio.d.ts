import { FC } from 'react';
import { ControlProps, OptionsSingleSelection, NormalizedOptionsConfig } from '../types';
declare type RadioConfig = NormalizedOptionsConfig & {
    isInline: boolean;
};
declare type RadioProps = ControlProps<OptionsSingleSelection> & RadioConfig;
export declare const RadioControl: FC<RadioProps>;
export {};
