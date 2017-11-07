import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollController, ResizeController } from 'react-scroll-parallax';

export default class ParallaxProvider extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
    };

    static childContextTypes = {
        scrollController: PropTypes.object,
        resizeController: PropTypes.object,
    };

    getChildContext() {
        // Passes down the reference to the controller
        const { scrollController, resizeController } = this;
        return { scrollController, resizeController };
    }

    componentWillMount() {
        // Don't initialize on the server
        const hasWindow = typeof window !== 'undefined';

        if (hasWindow) {
            // Must not be the server so kick it off...
            this.scrollController = ScrollController.init();
            this.resizeController = ResizeController.init();
        }
    }

    componentWillUnmount() {
        if (this.scrollController) {
            // Remove scroll and resize listener if the provider is unmounted
            this.scrollController.destroy();
            this.resizeController.destroy();
        }
    }

    render() {
        const { children } = this.props;

        return children;
    }
}
