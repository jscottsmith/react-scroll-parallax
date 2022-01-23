/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import clientModules from '@generated/client-modules';
function dispatchLifecycleAction(lifecycleAction, ...args) {
    clientModules.forEach((clientModule) => {
        var _a, _b;
        const lifecycleFunction = (_b = (_a = clientModule === null || clientModule === void 0 ? void 0 : clientModule.default) === null || _a === void 0 ? void 0 : _a[lifecycleAction]) !== null && _b !== void 0 ? _b : clientModule[lifecycleAction];
        if (lifecycleFunction) {
            lifecycleFunction(...args);
        }
    });
}
const clientLifecyclesDispatchers = {
    onRouteUpdate(...args) {
        dispatchLifecycleAction('onRouteUpdate', ...args);
    },
    onRouteUpdateDelayed(...args) {
        dispatchLifecycleAction('onRouteUpdateDelayed', ...args);
    },
};
export default clientLifecyclesDispatchers;
