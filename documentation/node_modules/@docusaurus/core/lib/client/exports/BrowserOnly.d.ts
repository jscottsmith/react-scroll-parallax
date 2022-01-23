/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="react" />
declare function BrowserOnly({ children, fallback, }: {
    children?: () => JSX.Element;
    fallback?: JSX.Element;
}): JSX.Element | null;
export default BrowserOnly;
