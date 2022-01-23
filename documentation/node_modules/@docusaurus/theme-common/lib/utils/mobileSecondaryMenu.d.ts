/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactNode, ComponentType } from 'react';
declare type ExtraProps = {
    toggleSidebar: () => void;
};
export declare type MobileSecondaryMenuComponent<Props> = ComponentType<Props & ExtraProps>;
export declare function MobileSecondaryMenuProvider({ children, }: {
    children: ReactNode;
}): JSX.Element;
export declare function useMobileSecondaryMenuRenderer(): (extraProps: ExtraProps) => ReactNode | undefined;
export declare function MobileSecondaryMenuFiller<Props extends Record<string, unknown>>({ component, props, }: {
    component: MobileSecondaryMenuComponent<Props & ExtraProps>;
    props: Props;
}): JSX.Element | null;
export {};
//# sourceMappingURL=mobileSecondaryMenu.d.ts.map