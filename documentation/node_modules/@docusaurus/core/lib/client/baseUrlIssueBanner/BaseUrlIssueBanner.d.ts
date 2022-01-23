/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="react" />
import './styles.module.css';
declare global {
    interface Window {
        __DOCUSAURUS_INSERT_BASEURL_BANNER: boolean;
    }
}
export default function BaseUrlIssueBanner(): JSX.Element | null;
