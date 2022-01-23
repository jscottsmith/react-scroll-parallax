/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="@docusaurus/module-type-aliases" />
/// <reference types="react" />
import type { LinkProps } from '@docusaurus/Link';
import type docusaurus from '../docusaurus';
declare global {
    interface Window {
        docusaurus: typeof docusaurus;
    }
}
declare function Link({ isNavLink, to, href, activeClassName, isActive, 'data-noBrokenLinkCheck': noBrokenLinkCheck, autoAddBaseUrl, ...props }: LinkProps): JSX.Element;
export default Link;
