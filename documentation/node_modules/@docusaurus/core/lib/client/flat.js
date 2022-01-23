/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const isTree = (x) => typeof x === 'object' && !!x && Object.keys(x).length > 0;
function flat(target) {
    const delimiter = '.';
    const output = {};
    function step(object, prefix) {
        Object.keys(object).forEach((key) => {
            const value = object[key];
            const newKey = prefix ? `${prefix}${delimiter}${key}` : key;
            if (isTree(value)) {
                step(value, newKey);
            }
            else {
                output[newKey] = value;
            }
        });
    }
    step(target);
    return output;
}
export default flat;
