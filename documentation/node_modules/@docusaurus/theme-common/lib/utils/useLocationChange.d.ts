/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Location } from '@docusaurus/history';
declare type LocationChangeEvent = {
    location: Location;
    previousLocation: Location | undefined;
};
declare type OnLocationChange = (locationChangeEvent: LocationChangeEvent) => void;
export declare function useLocationChange(onLocationChange: OnLocationChange): void;
export {};
//# sourceMappingURL=useLocationChange.d.ts.map