/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import DefaultFallback from '@theme/Error';
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }
    componentDidCatch(error) {
        // Catch errors in any components below and re-render with error message
        if (ExecutionEnvironment.canUseDOM) {
            this.setState({ error });
        }
    }
    render() {
        var _a;
        const { children } = this.props;
        const { error } = this.state;
        if (error) {
            const fallback = (_a = this.props.fallback) !== null && _a !== void 0 ? _a : DefaultFallback;
            return fallback({
                error,
                tryAgain: () => this.setState({ error: null }),
            });
        }
        return children;
    }
}
export default ErrorBoundary;
