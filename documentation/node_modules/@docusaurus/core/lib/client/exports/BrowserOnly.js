/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
// Similar comp to the one described here:
// https://www.joshwcomeau.com/react/the-perils-of-rehydration/#abstractions
function BrowserOnly({ children, fallback, }) {
    const isBrowser = useIsBrowser();
    if (isBrowser && children != null) {
        return React.createElement(React.Fragment, null, children());
    }
    return fallback || null;
}
export default BrowserOnly;
