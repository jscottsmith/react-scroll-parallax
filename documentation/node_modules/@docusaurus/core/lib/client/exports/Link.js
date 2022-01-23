/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useRef } from 'react';
import { NavLink, Link as RRLink } from 'react-router-dom';
import useDocusaurusContext from './useDocusaurusContext';
import isInternalUrl from './isInternalUrl';
import ExecutionEnvironment from './ExecutionEnvironment';
import { useLinksCollector } from '../LinksCollector';
import { useBaseUrlUtils } from './useBaseUrl';
import { applyTrailingSlash } from '@docusaurus/utils-common';
// TODO all this wouldn't be necessary if we used ReactRouter basename feature
// We don't automatically add base urls to all links,
// only the "safe" ones, starting with / (like /docs/introduction)
// this is because useBaseUrl() actually transforms relative links
// like "introduction" to "/baseUrl/introduction" => bad behavior to fix
const shouldAddBaseUrlAutomatically = (to) => to.startsWith('/');
function Link({ isNavLink, to, href, activeClassName, isActive, 'data-noBrokenLinkCheck': noBrokenLinkCheck, autoAddBaseUrl = true, ...props }) {
    var _a;
    const { siteConfig: { trailingSlash, baseUrl }, } = useDocusaurusContext();
    const { withBaseUrl } = useBaseUrlUtils();
    const linksCollector = useLinksCollector();
    // IMPORTANT: using to or href should not change anything
    // For example, MDX links will ALWAYS give us the href props
    // Using one prop or the other should not be used to distinguish
    // internal links (/docs/myDoc) from external links (https://github.com)
    const targetLinkUnprefixed = to || href;
    function maybeAddBaseUrl(str) {
        return autoAddBaseUrl && shouldAddBaseUrlAutomatically(str)
            ? withBaseUrl(str)
            : str;
    }
    const isInternal = isInternalUrl(targetLinkUnprefixed);
    // pathname:// is a special "protocol" we use to tell Docusaurus link
    // that a link is not "internal" and that we shouldn't use history.push()
    // this is not ideal but a good enough escape hatch for now
    // see https://github.com/facebook/docusaurus/issues/3309
    // note: we want baseUrl to be appended (see issue for details)
    // TODO read routes and automatically detect internal/external links?
    const targetLinkWithoutPathnameProtocol = targetLinkUnprefixed === null || targetLinkUnprefixed === void 0 ? void 0 : targetLinkUnprefixed.replace('pathname://', '');
    // TODO we should use ReactRouter basename feature instead!
    // Automatically apply base url in links that start with /
    let targetLink = typeof targetLinkWithoutPathnameProtocol !== 'undefined'
        ? maybeAddBaseUrl(targetLinkWithoutPathnameProtocol)
        : undefined;
    if (targetLink && isInternal) {
        targetLink = applyTrailingSlash(targetLink, { trailingSlash, baseUrl });
    }
    const preloaded = useRef(false);
    const LinkComponent = (isNavLink ? NavLink : RRLink);
    const IOSupported = ExecutionEnvironment.canUseIntersectionObserver;
    const ioRef = useRef();
    const handleIntersection = (el, cb) => {
        ioRef.current = new window.IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (el === entry.target) {
                    // If element is in viewport, stop listening/observing and run callback.
                    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
                    if (entry.isIntersecting || entry.intersectionRatio > 0) {
                        ioRef.current.unobserve(el);
                        ioRef.current.disconnect();
                        cb();
                    }
                }
            });
        });
        // Add element to the observer.
        ioRef.current.observe(el);
    };
    const handleRef = (ref) => {
        if (IOSupported && ref && isInternal) {
            // If IO supported and element reference found, setup Observer functionality.
            handleIntersection(ref, () => {
                if (targetLink != null) {
                    window.docusaurus.prefetch(targetLink);
                }
            });
        }
    };
    const onMouseEnter = () => {
        if (!preloaded.current && targetLink != null) {
            window.docusaurus.preload(targetLink);
            preloaded.current = true;
        }
    };
    useEffect(() => {
        // If IO is not supported. We prefetch by default (only once).
        if (!IOSupported && isInternal) {
            if (targetLink != null) {
                window.docusaurus.prefetch(targetLink);
            }
        }
        // When unmounting, stop intersection observer from watching.
        return () => {
            if (IOSupported && ioRef.current) {
                ioRef.current.disconnect();
            }
        };
    }, [ioRef, targetLink, IOSupported, isInternal]);
    const isAnchorLink = (_a = targetLink === null || targetLink === void 0 ? void 0 : targetLink.startsWith('#')) !== null && _a !== void 0 ? _a : false;
    const isRegularHtmlLink = !targetLink || !isInternal || isAnchorLink;
    if (targetLink && isInternal && !isAnchorLink && !noBrokenLinkCheck) {
        linksCollector.collectLink(targetLink);
    }
    return isRegularHtmlLink ? (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    React.createElement("a", { href: targetLink, ...(targetLinkUnprefixed &&
            !isInternal && { target: '_blank', rel: 'noopener noreferrer' }), ...props })) : (React.createElement(LinkComponent, { ...props, onMouseEnter: onMouseEnter, innerRef: handleRef, to: targetLink || '', ...(isNavLink && { isActive, activeClassName }) }));
}
export default Link;
