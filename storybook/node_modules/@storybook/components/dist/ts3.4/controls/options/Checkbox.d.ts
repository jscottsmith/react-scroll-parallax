import { FC } from 'react';
import { ControlProps, OptionsMultiSelection, NormalizedOptionsConfig } from '../types';
declare type CheckboxConfig = NormalizedOptionsConfig & {
    isInline: boolean;
};
declare type CheckboxProps = ControlProps<OptionsMultiSelection> & CheckboxConfig;
export declare const CheckboxControl: FC<CheckboxProps>;
export {};
