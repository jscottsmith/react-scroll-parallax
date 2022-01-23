import React, { ComponentProps } from 'react';
import { IconKey } from './icons';
import Svg from './svg';
export interface IconsProps extends ComponentProps<typeof Svg> {
    icon?: IconKey;
    symbol?: IconKey;
}
export declare const Icons: React.NamedExoticComponent<IconsProps>;
export interface SymbolsProps extends ComponentProps<typeof Svg> {
    icons?: IconKey[];
}
export declare const Symbols: React.NamedExoticComponent<SymbolsProps>;
