import { ReactElement } from 'react';
declare type ZoomProps = {
    scale: number;
    children: ReactElement | ReactElement[];
};
export declare function ZoomElement({ scale, children }: ZoomProps): JSX.Element;
export {};
