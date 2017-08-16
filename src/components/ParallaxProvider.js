import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ParallaxController } from 'react-scroll-parallax';

export default class ParallaxProvider extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
    };

    static childContextTypes = {
        parallaxController: PropTypes.object,
    };

    getChildContext() {
        // Passes down the reference to the controller
        const { parallaxController } = this;
        return { parallaxController };
    }

    componentWillMount() {
        // Don't initialize on the server
        const isServer = typeof window === 'undefined';

        if (!isServer) {
            // Must not be the server so kick it off...
            this.parallaxController = ParallaxController.init();
        }
    }

    componentWillUnmount() {
        if (this.parallaxController) {
            // Remove scroll and resize listener if the provider is unmounted
            this.parallaxController.destroy();
        }
    }

    render() {
        const { children } = this.props;

        return children;
    }
}
