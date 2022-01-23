/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Dispatch, SetStateAction, ReactNode } from 'react';
export declare type UseCollapsibleConfig = {
    initialState: boolean | (() => boolean);
};
export declare type UseCollapsibleReturns = {
    collapsed: boolean;
    setCollapsed: Dispatch<SetStateAction<boolean>>;
    toggleCollapsed: () => void;
};
export declare function useCollapsible({ initialState, }: UseCollapsibleConfig): UseCollapsibleReturns;
declare type CollapsibleAnimationConfig = {
    duration?: number;
    easing?: string;
};
declare type CollapsibleElementType = React.ElementType<Pick<React.HTMLAttributes<unknown>, 'className' | 'onTransitionEnd' | 'style'>>;
declare type CollapsibleBaseProps = {
    as?: CollapsibleElementType;
    collapsed: boolean;
    children: ReactNode;
    animation?: CollapsibleAnimationConfig;
    onCollapseTransitionEnd?: (collapsed: boolean) => void;
    className?: string;
    disableSSRStyle?: boolean;
};
declare type CollapsibleProps = CollapsibleBaseProps & {
    lazy: boolean;
};
export declare function Collapsible({ lazy, ...props }: CollapsibleProps): JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map