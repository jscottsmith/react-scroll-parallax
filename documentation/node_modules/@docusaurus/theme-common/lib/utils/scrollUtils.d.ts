/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { ReactNode } from 'react';
/**
 * We need a way to update the scroll position while ignoring scroll events
 * without affecting Navbar/BackToTop visibility
 *
 * This API permits to temporarily disable/ignore scroll events
 * Motivated by https://github.com/facebook/docusaurus/pull/5618
 */
declare type ScrollController = {
    /**
     * A boolean ref tracking whether scroll events are enabled
     */
    scrollEventsEnabledRef: React.MutableRefObject<boolean>;
    /**
     * Enables scroll events in `useScrollPosition`
     */
    enableScrollEvents: () => void;
    /**
     * Disables scroll events in `useScrollPosition`
     */
    disableScrollEvents: () => void;
};
export declare function ScrollControllerProvider({ children, }: {
    children: ReactNode;
}): JSX.Element;
export declare function useScrollController(): ScrollController;
declare type ScrollPosition = {
    scrollX: number;
    scrollY: number;
};
export declare function useScrollPosition(effect: (position: ScrollPosition, lastPosition: ScrollPosition | null) => void, deps?: unknown[]): void;
declare type UseScrollPositionBlockerReturn = {
    blockElementScrollPositionUntilNextRender: (el: HTMLElement) => void;
};
/**
 * This hook permits to "block" the scroll position of a dom element
 * The idea is that we should be able to update DOM content above this element
 * but the screen position of this element should not change
 *
 * Feature motivated by the Tabs groups:
 * clicking on a tab may affect tabs of the same group upper in the tree
 * Yet to avoid a bad UX, the clicked tab must remain under the user mouse!
 * See GIF here: https://github.com/facebook/docusaurus/pull/5618
 */
export declare function useScrollPositionBlocker(): UseScrollPositionBlockerReturn;
export {};
//# sourceMappingURL=scrollUtils.d.ts.map