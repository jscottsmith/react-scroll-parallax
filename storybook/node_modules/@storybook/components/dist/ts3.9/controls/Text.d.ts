import { FC } from 'react';
import { ControlProps, TextValue, TextConfig } from './types';
export declare type TextProps = ControlProps<TextValue | undefined> & TextConfig;
export declare const TextControl: FC<TextProps>;
