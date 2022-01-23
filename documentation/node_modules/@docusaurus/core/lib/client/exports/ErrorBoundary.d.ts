/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="@docusaurus/module-type-aliases" />
import React, { ReactNode } from 'react';
import type { Props } from '@docusaurus/ErrorBoundary';
interface State {
    error: Error | null;
}
declare class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidCatch(error: Error): void;
    render(): ReactNode;
}
export default ErrorBoundary;
