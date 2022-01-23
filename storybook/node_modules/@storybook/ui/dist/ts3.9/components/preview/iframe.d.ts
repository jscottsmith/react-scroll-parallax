import { IframeHTMLAttributes } from 'react';
export interface IFrameProps {
    id: string;
    title: string;
    src: string;
    allowFullScreen: boolean;
    scale: number;
    active: boolean;
}
export declare function IFrame(props: IFrameProps & IframeHTMLAttributes<HTMLIFrameElement>): JSX.Element;
