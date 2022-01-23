/// <reference types="react" />
import { Element } from 'parallax-controller';
import { ParallaxProps } from '../components/Parallax/types';
export declare function useParallax<T extends HTMLElement>(props: ParallaxProps): {
    ref: import("react").RefObject<T>;
    controller: import("parallax-controller").ParallaxController | null;
    element: Element | undefined;
};
