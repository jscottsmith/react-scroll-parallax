import { FunctionComponent, ReactNode } from 'react';
import { Modifier, Placement } from '@popperjs/core';
interface WithHideFn {
    onHide: () => void;
}
export interface WithTooltipPureProps {
    svg?: boolean;
    trigger?: 'none' | 'hover' | 'click' | 'right-click';
    closeOnClick?: boolean;
    placement?: Placement;
    modifiers?: Array<Partial<Modifier<string, {}>>>;
    hasChrome?: boolean;
    tooltip: ReactNode | ((p: WithHideFn) => ReactNode);
    children: ReactNode;
    tooltipShown?: boolean;
    onVisibilityChange?: (visibility: boolean) => void | boolean;
    onDoubleClick?: () => void;
}
declare const WithTooltipPure: FunctionComponent<WithTooltipPureProps>;
declare const WithToolTipState: FunctionComponent<WithTooltipPureProps & {
    startOpen?: boolean;
}>;
export { WithTooltipPure, WithToolTipState, WithToolTipState as WithTooltip };
