import { FC } from 'react';
import { ControlProps, OptionsSelection, NormalizedOptionsConfig } from '../types';
declare type SelectConfig = NormalizedOptionsConfig & {
    isMulti: boolean;
};
declare type SelectProps = ControlProps<OptionsSelection> & SelectConfig;
export declare const SelectControl: FC<SelectProps>;
export {};
