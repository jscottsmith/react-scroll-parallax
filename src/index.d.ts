import * as React from 'react';

export const ParallaxProvider: React.ComponentType<ParallaxProviderProps>;

// =======================
// === Parallax Banner ===
// =======================

export const ParallaxBanner: React.ComponentType<ParallaxBannerProps>;

export interface WithControllerInjectedProps {
  parallaxController: ParallaxController;
}

// helper to remove props from a type
type RemoveProps<T, U extends keyof T> = Pick<T, Exclude<keyof T, U>>;

export interface ParallaxContextValue {
  parallaxController: ParallaxController;
}

export const ParallaxContext: React.Context<ParallaxContextValue>;

export function useController(): WithControllerInjectedProps;
