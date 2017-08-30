import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollController } from 'react-scroll-parallax';

export default class ScrollProvider extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
    };

    static childContextTypes = {
        scrollController: PropTypes.object,
    };

    getChildContext() {
        // Passes down the reference to the controller
        const { scrollController } = this;
        return { scrollController };
    }

    componentWillMount() {
        // Don't initialize on the server
        const hasWindow = typeof window !== 'undefined';

        if (hasWindow) {
            // Must not be the server so kick it off...
            this.scrollController = ScrollController.init();
        }
    }

    componentWillUnmount() {
        if (this.scrollController) {
            // Remove scroll and resize listener if the provider is unmounted
            this.scrollController.destroy();
        }
    }

    render() {
        const { children } = this.props;

        return children;
    }
}
