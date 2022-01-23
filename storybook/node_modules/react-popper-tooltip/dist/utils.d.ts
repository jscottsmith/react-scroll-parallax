import React from 'react';
import { Ref } from './types';
export declare const TooltipContext: React.Context<{}>;
declare type Fn = ((...args: any[]) => void) | undefined;
export declare const callAll: (...fns: Fn[]) => (...args: any[]) => void;
export declare const noop: () => void;
export declare const canUseDOM: () => boolean;
export declare const setRef: (ref: Ref, node: HTMLElement | null) => void;
export {};
