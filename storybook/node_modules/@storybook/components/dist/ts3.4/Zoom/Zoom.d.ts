import { ZoomElement as Element } from './ZoomElement';
import { ZoomIFrame as IFrame } from './ZoomIFrame';
export declare const browserSupportsCssZoom: () => boolean;
export declare const Zoom: {
    Element: typeof Element;
    IFrame: typeof IFrame;
};
