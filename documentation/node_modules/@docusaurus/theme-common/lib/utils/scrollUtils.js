/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, } from 'react';
import { useDynamicCallback } from './reactUtils';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
function useScrollControllerContextValue() {
    const scrollEventsEnabledRef = useRef(true);
    return useMemo(() => ({
        scrollEventsEnabledRef,
        enableScrollEvents: () => {
            scrollEventsEnabledRef.current = true;
        },
        disableScrollEvents: () => {
            scrollEventsEnabledRef.current = false;
        },
    }), []);
}
const ScrollMonitorContext = createContext(undefined);
export function ScrollControllerProvider({ children, }) {
    return (React.createElement(ScrollMonitorContext.Provider, { value: useScrollControllerContextValue() }, children));
}
export function useScrollController() {
    const context = useContext(ScrollMonitorContext);
    if (context == null) {
        throw new Error('"useScrollController" is used but no context provider was found in the React tree.');
    }
    return context;
}
const getScrollPosition = () => ExecutionEnvironment.canUseDOM
    ? {
        scrollX: window.pageXOffset,
        scrollY: window.pageYOffset,
    }
    : null;
export function useScrollPosition(effect, deps = []) {
    const { scrollEventsEnabledRef } = useScrollController();
    const lastPositionRef = useRef(getScrollPosition());
    const dynamicEffect = useDynamicCallback(effect);
    useEffect(() => {
        const handleScroll = () => {
            if (!scrollEventsEnabledRef.current) {
                return;
            }
            const currentPosition = getScrollPosition();
            if (dynamicEffect) {
                dynamicEffect(currentPosition, lastPositionRef.current);
            }
            lastPositionRef.current = currentPosition;
        };
        const opts = {
            passive: true,
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, opts);
        return () => window.removeEventListener('scroll', handleScroll, opts);
    }, [
        dynamicEffect,
        scrollEventsEnabledRef,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ...deps,
    ]);
}
function useScrollPositionSaver() {
    const lastElementRef = useRef({
        elem: null,
        top: 0,
    });
    const save = useCallback((elem) => {
        lastElementRef.current = {
            elem,
            top: elem.getBoundingClientRect().top,
        };
    }, []);
    const restore = useCallback(() => {
        const { current: { elem, top }, } = lastElementRef;
        if (!elem) {
            return { restored: false };
        }
        const newTop = elem.getBoundingClientRect().top;
        const heightDiff = newTop - top;
        if (heightDiff) {
            window.scrollBy({ left: 0, top: heightDiff });
        }
        lastElementRef.current = { elem: null, top: 0 };
        return { restored: heightDiff !== 0 };
    }, []);
    return useMemo(() => ({ save, restore }), [restore, save]);
}
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
export function useScrollPositionBlocker() {
    const scrollController = useScrollController();
    const scrollPositionSaver = useScrollPositionSaver();
    const nextLayoutEffectCallbackRef = useRef(undefined);
    const blockElementScrollPositionUntilNextRender = useCallback((el) => {
        scrollPositionSaver.save(el);
        scrollController.disableScrollEvents();
        nextLayoutEffectCallbackRef.current = () => {
            const { restored } = scrollPositionSaver.restore();
            nextLayoutEffectCallbackRef.current = undefined;
            // Restoring the former scroll position will trigger a scroll event
            // We need to wait for next scroll event to happen
            // before enabling again the scrollController events
            if (restored) {
                const handleScrollRestoreEvent = () => {
                    scrollController.enableScrollEvents();
                    window.removeEventListener('scroll', handleScrollRestoreEvent);
                };
                window.addEventListener('scroll', handleScrollRestoreEvent);
            }
            else {
                scrollController.enableScrollEvents();
            }
        };
    }, [scrollController, scrollPositionSaver]);
    useLayoutEffect(() => {
        var _a;
        (_a = nextLayoutEffectCallbackRef.current) === null || _a === void 0 ? void 0 : _a.call(nextLayoutEffectCallbackRef);
    });
    return {
        blockElementScrollPositionUntilNextRender,
    };
}
//# sourceMappingURL=scrollUtils.js.map