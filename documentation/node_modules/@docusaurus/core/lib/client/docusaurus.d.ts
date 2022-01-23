/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
declare global {
    const __webpack_require__: {
        gca: (name: string) => string;
    };
    interface Navigator {
        connection: {
            effectiveType: string;
            saveData: boolean;
        };
    }
}
declare const docusaurus: {
    prefetch: (routePath: string) => boolean;
    preload: (routePath: string) => boolean;
};
export default docusaurus;
