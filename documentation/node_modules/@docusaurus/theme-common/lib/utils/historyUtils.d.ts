/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { Location, Action } from '@docusaurus/history';
declare type HistoryBlockHandler = (location: Location, action: Action) => void | false;
export declare function useHistoryActionHandler(handler: HistoryBlockHandler): void;
export declare function useHistoryPopHandler(handler: HistoryBlockHandler): void;
export {};
//# sourceMappingURL=historyUtils.d.ts.map