/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ConfigAPI, TransformOptions } from '@babel/core';
declare function babelPresets(api: ConfigAPI): TransformOptions;
export default babelPresets;
