/// <reference types="react" />
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';
export declare type Axis = 'x' | 'y';
declare const Handle: import("@emotion/styled-base").StyledComponent<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {
    isDragging: boolean;
    axis: Axis;
}, import("@storybook/theming").Theme>;
export { Draggable, Handle };
export { DraggableEvent, DraggableData };
