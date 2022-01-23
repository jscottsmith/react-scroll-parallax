/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useRef, useState } from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import clsx from 'clsx';
import { useCollapsible, Collapsible } from '../Collapsible';
import styles from './styles.module.css';
function isInSummary(node) {
    if (!node) {
        return false;
    }
    return node.tagName === 'SUMMARY' || isInSummary(node.parentElement);
}
function hasParent(node, parent) {
    if (!node) {
        return false;
    }
    return node === parent || hasParent(node.parentElement, parent);
}
function Details({ summary, children, ...props }) {
    const isBrowser = useIsBrowser();
    const detailsRef = useRef(null);
    const { collapsed, setCollapsed } = useCollapsible({
        initialState: !props.open,
    });
    // We use a separate prop because it must be set only after animation completes
    // Otherwise close anim won't work
    const [open, setOpen] = useState(props.open);
    return (React.createElement("details", { ...props, ref: detailsRef, open: open, "data-collapsed": collapsed, className: clsx(styles.details, { [styles.isBrowser]: isBrowser }, props.className), onMouseDown: (e) => {
            const target = e.target;
            // Prevent a double-click to highlight summary text
            if (isInSummary(target) && e.detail > 1) {
                e.preventDefault();
            }
        }, onClick: (e) => {
            e.stopPropagation(); // For isolation of multiple nested details/summary
            const target = e.target;
            const shouldToggle = isInSummary(target) && hasParent(target, detailsRef.current);
            if (!shouldToggle) {
                return;
            }
            e.preventDefault();
            if (collapsed) {
                setCollapsed(false);
                setOpen(true);
            }
            else {
                setCollapsed(true);
                // setOpen(false); // Don't do this, it breaks close animation!
            }
        } },
        summary,
        React.createElement(Collapsible, { lazy: false, collapsed: collapsed, disableSSRStyle // Allows component to work fine even with JS disabled!
            : true, onCollapseTransitionEnd: (newCollapsed) => {
                setCollapsed(newCollapsed);
                setOpen(!newCollapsed);
            } },
            React.createElement("div", { className: styles.collapsibleContent }, children))));
}
export default Details;
//# sourceMappingURL=index.js.map