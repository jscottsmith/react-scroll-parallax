import React from 'react';
import OverlayScrollbars from 'overlayscrollbars';
interface OverlayScrollbarsComponentProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: any;
    options?: OverlayScrollbars.Options;
    extensions?: OverlayScrollbars.Extensions;
}
/**
 * Using overlayscrollbars-react component results use the esm modules
 * which doesn't go through babel leading to IE 11 uncompatibility
 * A PR is submitted that may fix this:
 * https://github.com/KingSora/OverlayScrollbars/pull/218
 * */
export declare const OverlayScrollbarsComponent: React.FC<OverlayScrollbarsComponentProps>;
export default OverlayScrollbarsComponent;
