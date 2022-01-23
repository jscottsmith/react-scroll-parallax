/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactNode } from 'react';
export declare const AnnouncementBarDismissStorageKey = "docusaurus.announcement.dismiss";
declare type AnnouncementBarAPI = {
    readonly isActive: boolean;
    readonly close: () => void;
};
export declare function AnnouncementBarProvider({ children, }: {
    children: ReactNode;
}): JSX.Element;
export declare const useAnnouncementBar: () => AnnouncementBarAPI;
export {};
//# sourceMappingURL=announcementBarUtils.d.ts.map