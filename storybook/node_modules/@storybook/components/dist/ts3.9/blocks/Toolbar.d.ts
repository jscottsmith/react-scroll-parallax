import { FunctionComponent } from 'react';
interface ZoomProps {
    zoom: (val: number) => void;
    resetZoom: () => void;
}
interface EjectProps {
    storyId?: string;
    baseUrl?: string;
}
interface BarProps {
    border?: boolean;
}
interface LoadingProps {
    isLoading?: boolean;
}
export declare type ToolbarProps = BarProps & ZoomProps & EjectProps & LoadingProps;
export declare const Toolbar: FunctionComponent<ToolbarProps>;
export {};
