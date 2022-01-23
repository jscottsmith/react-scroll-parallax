/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState, useContext, createContext, useEffect, useMemo, } from 'react';
function useContextValue() {
    return useState(null);
}
const Context = createContext(null);
export function MobileSecondaryMenuProvider({ children, }) {
    return (React.createElement(Context.Provider, { value: useContextValue() }, children));
}
function useMobileSecondaryMenuContext() {
    const value = useContext(Context);
    if (value === null) {
        throw new Error('MobileSecondaryMenuProvider was not used correctly, context value is null');
    }
    return value;
}
export function useMobileSecondaryMenuRenderer() {
    const [state] = useMobileSecondaryMenuContext();
    if (state) {
        const Comp = state.component;
        return function render(extraProps) {
            return React.createElement(Comp, { ...state.props, ...extraProps });
        };
    }
    return () => undefined;
}
function useShallowMemoizedObject(obj) {
    return useMemo(() => obj, 
    // Is this safe?
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...Object.keys(obj), ...Object.values(obj)]);
}
// Fill the secondary menu placeholder with some real content
export function MobileSecondaryMenuFiller({ component, props, }) {
    const [, setState] = useMobileSecondaryMenuContext();
    // To avoid useless context re-renders, props are memoized shallowly
    const memoizedProps = useShallowMemoizedObject(props);
    useEffect(() => {
        // @ts-expect-error: context is not 100% typesafe but it's ok
        setState({ component, props: memoizedProps });
    }, [setState, component, memoizedProps]);
    useEffect(() => () => setState(null), [setState]);
    return null;
}
//# sourceMappingURL=mobileSecondaryMenu.js.map