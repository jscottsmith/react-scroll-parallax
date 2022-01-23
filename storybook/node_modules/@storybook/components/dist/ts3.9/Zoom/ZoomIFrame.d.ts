import { Component, ReactElement } from 'react';
export declare type IZoomIFrameProps = {
    scale: number;
    children: ReactElement<HTMLIFrameElement>;
    iFrameRef: React.MutableRefObject<HTMLIFrameElement>;
    active?: boolean;
};
export declare class ZoomIFrame extends Component<IZoomIFrameProps> {
    iframe: HTMLIFrameElement;
    componentDidMount(): void;
    shouldComponentUpdate(nextProps: IZoomIFrameProps): boolean;
    setIframeInnerZoom(scale: number): void;
    setIframeZoom(scale: number): void;
    render(): ReactElement<HTMLIFrameElement, string | ((props: any) => ReactElement<any, any>) | (new (props: any) => Component<any, any, any>)> | (ReactElement<HTMLIFrameElement, string | ((props: any) => ReactElement<any, any>) | (new (props: any) => Component<any, any, any>)> & string) | (ReactElement<HTMLIFrameElement, string | ((props: any) => ReactElement<any, any>) | (new (props: any) => Component<any, any, any>)> & number) | (ReactElement<HTMLIFrameElement, string | ((props: any) => ReactElement<any, any>) | (new (props: any) => Component<any, any, any>)> & false) | (ReactElement<HTMLIFrameElement, string | ((props: any) => ReactElement<any, any>) | (new (props: any) => Component<any, any, any>)> & true) | (ReactElement<HTMLIFrameElement, string | ((props: any) => ReactElement<any, any>) | (new (props: any) => Component<any, any, any>)> & ReactElement<any, string | ((props: any) => ReactElement<any, any>) | (new (props: any) => Component<any, any, any>)>) | (ReactElement<HTMLIFrameElement, string | ((props: any) => ReactElement<any, any>) | (new (props: any) => Component<any, any, any>)> & import("react").ReactNodeArray) | (ReactElement<HTMLIFrameElement, string | ((props: any) => ReactElement<any, any>) | (new (props: any) => Component<any, any, any>)> & import("react").ReactPortal);
}
