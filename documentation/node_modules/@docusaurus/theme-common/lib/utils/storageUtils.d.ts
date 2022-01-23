/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
declare const StorageTypes: readonly ["localStorage", "sessionStorage", "none"];
export declare type StorageType = typeof StorageTypes[number];
export interface StorageSlot {
    get: () => string | null;
    set: (value: string) => void;
    del: () => void;
}
/**
 * Creates an object for accessing a particular key in localStorage.
 * The API is fail-safe, and usage of browser storage should be considered unreliable
 * Local storage might simply be unavailable (iframe + browser security) or operations might fail individually
 * Please assume that using this API can be a NO-OP
 * See also https://github.com/facebook/docusaurus/issues/6036
 */
export declare const createStorageSlot: (key: string, options?: {
    persistence?: "localStorage" | "none" | "sessionStorage" | undefined;
} | undefined) => StorageSlot;
/**
 * Returns a list of all the keys currently stored in browser storage
 * or an empty list if browser storage can't be accessed.
 */
export declare function listStorageKeys(storageType?: StorageType): string[];
export {};
//# sourceMappingURL=storageUtils.d.ts.map