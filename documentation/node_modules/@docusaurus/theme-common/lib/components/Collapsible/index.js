/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import React, { useState, useEffect, useRef, useCallback, useLayoutEffect, } from 'react';
const DefaultAnimationEasing = 'ease-in-out';
// This hook just define the state
export function useCollapsible({ initialState, }) {
    const [collapsed, setCollapsed] = useState(initialState !== null && initialState !== void 0 ? initialState : false);
    const toggleCollapsed = useCallback(() => {
        setCollapsed((expanded) => !expanded);
    }, []);
    return {
        collapsed,
        setCollapsed,
        toggleCollapsed,
    };
}
const CollapsedStyles = {
    display: 'none',
    overflow: 'hidden',
    height: '0px',
};
const ExpandedStyles = {
    display: 'block',
    overflow: 'visible',
    height: 'auto',
};
function applyCollapsedStyle(el, collapsed) {
    const collapsedStyles = collapsed ? CollapsedStyles : ExpandedStyles;
    el.style.display = collapsedStyles.display;
    el.style.overflow = collapsedStyles.overflow;
    el.style.height = collapsedStyles.height;
}
/*
Lex111: Dynamic transition duration is used in Material design, this technique is good for a large number of items.
https://material.io/archive/guidelines/motion/duration-easing.html#duration-easing-dynamic-durations
https://github.com/mui-org/material-ui/blob/e724d98eba018e55e1a684236a2037e24bcf050c/packages/material-ui/src/styles/createTransitions.js#L40-L43
 */
function getAutoHeightDuration(height) {
    const constant = height / 36;
    return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}
function useCollapseAnimation({ collapsibleRef, collapsed, animation, }) {
    const mounted = useRef(false);
    useEffect(() => {
        const el = collapsibleRef.current;
        function getTransitionStyles() {
            var _a, _b;
            const height = el.scrollHeight;
            const duration = (_a = animation === null || animation === void 0 ? void 0 : animation.duration) !== null && _a !== void 0 ? _a : getAutoHeightDuration(height);
            const easing = (_b = animation === null || animation === void 0 ? void 0 : animation.easing) !== null && _b !== void 0 ? _b : DefaultAnimationEasing;
            return {
                transition: `height ${duration}ms ${easing}`,
                height: `${height}px`,
            };
        }
        function applyTransitionStyles() {
            const transitionStyles = getTransitionStyles();
            el.style.transition = transitionStyles.transition;
            el.style.height = transitionStyles.height;
        }
        // On mount, we just apply styles, no animated transition
        if (!mounted.current) {
            applyCollapsedStyle(el, collapsed);
            mounted.current = true;
            return undefined;
        }
        el.style.willChange = 'height';
        function startAnimation() {
            const animationFrame = requestAnimationFrame(() => {
                // When collapsing
                if (collapsed) {
                    applyTransitionStyles();
                    requestAnimationFrame(() => {
                        el.style.height = CollapsedStyles.height;
                        el.style.overflow = CollapsedStyles.overflow;
                    });
                }
                // When expanding
                else {
                    el.style.display = 'block';
                    requestAnimationFrame(() => {
                        applyTransitionStyles();
                    });
                }
            });
            return () => cancelAnimationFrame(animationFrame);
        }
        return startAnimation();
    }, [collapsibleRef, collapsed, animation]);
}
// Prevent hydration layout shift before anims are handled imperatively with JS
function getSSRStyle(collapsed) {
    if (ExecutionEnvironment.canUseDOM) {
        return undefined;
    }
    return collapsed ? CollapsedStyles : ExpandedStyles;
}
function CollapsibleBase({ as: As = 'div', collapsed, children, animation, onCollapseTransitionEnd, className, disableSSRStyle, }) {
    // any because TS is a pain for HTML element refs, see https://twitter.com/sebastienlorber/status/1412784677795110914
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const collapsibleRef = useRef(null);
    useCollapseAnimation({ collapsibleRef, collapsed, animation });
    return (React.createElement(As
    // @ts-expect-error: the "too complicated type" is produced from "CollapsibleElementType" being a huge union
    , { 
        // @ts-expect-error: the "too complicated type" is produced from "CollapsibleElementType" being a huge union
        ref: collapsibleRef, style: disableSSRStyle ? undefined : getSSRStyle(collapsed), onTransitionEnd: (e) => {
            if (e.propertyName !== 'height') {
                return;
            }
            applyCollapsedStyle(collapsibleRef.current, collapsed);
            onCollapseTransitionEnd === null || onCollapseTransitionEnd === void 0 ? void 0 : onCollapseTransitionEnd(collapsed);
        }, className: className }, children));
}
function CollapsibleLazy({ collapsed, ...props }) {
    const [mounted, setMounted] = useState(!collapsed);
    useLayoutEffect(() => {
        if (!collapsed) {
            setMounted(true);
        }
    }, [collapsed]);
    // lazyCollapsed updated in effect so that the first expansion transition can work
    const [lazyCollapsed, setLazyCollapsed] = useState(collapsed);
    useLayoutEffect(() => {
        if (mounted) {
            setLazyCollapsed(collapsed);
        }
    }, [mounted, collapsed]);
    return mounted ? (React.createElement(CollapsibleBase, { ...props, collapsed: lazyCollapsed })) : null;
}
export function Collapsible({ lazy, ...props }) {
    const Comp = lazy ? CollapsibleLazy : CollapsibleBase;
    return React.createElement(Comp, { ...props });
}
//# sourceMappingURL=index.js.map