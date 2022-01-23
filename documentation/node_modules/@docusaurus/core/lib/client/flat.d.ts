/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { RouteChunksTree } from '@docusaurus/types';
declare function flat(target: RouteChunksTree): Record<string, string>;
export default flat;
