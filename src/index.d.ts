import * as React from 'react';

// ========================
// === ParallaxProvider ===
// ========================
export interface ParallaxProviderProps {
    /**
     * Optionally pass the scroll axis for setting horizontal/vertical scrolling. One of vertical or
     * horizontal
     */
    scrollAxis?: 'vertical' | 'horizontal';
    /**
     * Optionally set the container that has overflow and will contain parallax elements. Defaults
     * to the HTML body
     */
    scrollContainer?: any;
}
export const ParallaxProvider: React.ComponentType<ParallaxProviderProps>;

// =======================
// === Parallax Banner ===
// =======================
export interface BannerLayer {
    /**
     * A value from `-1` to `1` that represents the vertical offset to be applied to the current
     * layer, `0.1` would equal a `10%` offset on the top and bottom.
     */
    amount: number;
    /**
     * Custom layer children provided as a React element, for example `<Video />`
     */
    children?: any;
    /**
     * Indicate if the layer should be expanded with negative top/bottom margins so the edges will
     * never be visible.
     */
    expanded?: boolean;
    /**
     * Image source that will be applied as a CSS background image on the layer.
     */
    image?: string;
    /*
     * 	Props to apply to the layer element.
     */
    props?: any;
}

export interface ParallaxBannerProps {
    /**
     * Optionally pass additional class names to be added to the outermost parallax banner element.
     */
    className?: string;
    /**
     * Determines if the internal parallax layers will have offsets applied.
     */
    disabled?: boolean;
    /**
     * A required Array of Objects with layer properties: `[{ amount: 0.1, image: 'foo.jpg' }]`.
     */
    layers: BannerLayer[];
    /**
     * Optionally pass a style object to be added to the outermost parallax banner element.
     */
    style?: any;
}
export const ParallaxBanner: React.ComponentType<ParallaxBannerProps>;

export interface ParallaxController {
    update(): void;
    destroy(): void;
}
export interface WithControllerInjectedProps {
    parallaxController: ParallaxController;
}

// helper to remove props from a type
type RemoveProps<T, U extends keyof T> = Pick<T, Exclude<keyof T, U>>;

export function withController<P extends WithControllerInjectedProps>(
    Component: React.ComponentType<P>
): React.ComponentType<RemoveProps<P, 'parallaxController'>>;

export interface ParallaxContextValue {
    parallaxController: ParallaxController;
}

export const ParallaxContext: React.Context<ParallaxContextValue>;

export function useController(): WithControllerInjectedProps;
